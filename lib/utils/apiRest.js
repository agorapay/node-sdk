"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var ApiRest = /** @class */ (function () {
    function ApiRest(config) {
        this.config = config;
    }
    ApiRest.prototype.json_fields_toString = function (payload) {
        var _this = this;
        Object.keys(payload).forEach(function (key) {
            if (payload[key] !== undefined) {
                if (payload[key].encode) {
                    payload[key] = payload[key].encode();
                }
                else if (typeof payload[key] === 'object') {
                    _this.json_fields_toString(payload[key]);
                }
                else {
                    payload[key] = payload[key].toString();
                }
            }
        });
    };
    ApiRest.prototype.sendToApiPost = function (endPoint, payload, multiPart) {
        if (multiPart === void 0) { multiPart = false; }
        var BASE_URL = this.config.baseUrl;
        var url = BASE_URL + endPoint;
        this.json_fields_toString(payload);
        var boundary = null;
        if (multiPart) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            var FormData_1 = require('form-data');
            var form_data_1 = new FormData_1();
            boundary = form_data_1.getBoundary();
            form_data_1.append('json', JSON.stringify(payload.json || {}), { contentType: 'application/json; charset=UTF-8' });
            if (payload.files) {
                payload.files.forEach(function (x) {
                    form_data_1.append(x.name, Buffer.from(x.data).toString('base64'), { header: { 'Content-Transfer-Encoding': 'base64' }, filename: x.fileName });
                });
            }
            payload = form_data_1.getBuffer();
        }
        var message = {
            method: 'post',
            url: url,
            data: payload,
            timeout: this.config.timeout,
            validateStatus: function (status) { return status == 200 || status == 401; }
        };
        message.headers = {
            'Authorization': "Bearer ".concat(this.config.tokenValue),
            'id_token': "".concat(this.config.tokenId)
        };
        if (multiPart) {
            message.headers['Content-Type'] = "multipart/form-data; boundary=".concat(boundary);
        }
        if (!this.config.tokenValue || this.config.tokenExpiry < Date.now())
            return this.authenticate(message, true);
        return this.sendRequest(message, function (res, api) {
            if (res.status == 401)
                return api.authenticate(message, false);
            return res.data;
        }, function (error) {
            if (error.response.status === 400) {
                return { resultCode: error.response.data.resultCode.toString(), resultCodeMessage: error.response.data.resultCodeMessage };
            }
            return { resultCode: error.response.status.toString(), resultCodeMessage: error.response.statusText };
        });
    };
    ApiRest.prototype.sendToApiGet = function (endPoint, payload) {
        var BASE_URL = this.config.baseUrl;
        var url = BASE_URL + endPoint;
        var message = {
            method: 'get',
            url: url,
            headers: null,
            params: payload,
            timeout: this.config.timeout,
            validateStatus: function (status) { return status == 200 || status == 401; }
        };
        if (!Object.prototype.hasOwnProperty.call(this.config, 'tokenValue') || this.config.tokenExpiry < Date.now())
            return this.authenticate(message, true);
        message.headers = {
            'Authorization': "Bearer ".concat(this.config.tokenValue),
            'id_token': "".concat(this.config.tokenId)
        };
        return this.sendRequest(message, function (res, api) {
            if (res.status == 401)
                return api.authenticate(message, false);
            return res.data;
        }, function (error) {
            if (error.response.status === 400) {
                return { resultCode: error.response.data.resultCode.toString(), resultCodeMessage: error.response.data.resultCodeMessage };
            }
            return { resultCode: error.response.status.toString(), resultCodeMessage: error.response.statusText };
        });
    };
    ApiRest.prototype.sendRequest = function (message, success, failure) {
        var _this = this;
        return axios_1.default.request(message).then(function (res) {
            return success(res, _this);
        }).catch(function (error) {
            return failure(error, _this);
        });
    };
    ApiRest.prototype.authenticate = function (message, retry) {
        if (retry === void 0) { retry = false; }
        return this.sendRequest({
            method: this.config.tokenMethod,
            url: this.config.tokenUrl,
            timeout: this.config.timeout,
            headers: {
                'Authorization': 'Basic ' + Buffer.from(this.config.tokenUser + ':' + this.config.tokenPassword).toString('base64')
            }
        }, function (res, api) {
            api.config.tokenValue = res.data['access_token'];
            api.config.tokenId = res.data['id_token'];
            api.config.tokenExpiry = Date.now() + parseInt(res.data['expires_in'].toString()) * 1000;
            message.headers['Authorization'] = "Bearer ".concat(api.config.tokenValue);
            message.headers['id_token'] = "".concat(api.config.tokenId);
            return api.sendRequest(message, function (res, api) {
                if (res.status == 401) {
                    if (retry)
                        return api.authenticate(message, false);
                    return { resultCode: res.status.toString(), resultCodeMessage: res.statusText };
                }
                return res.data;
            }, function (error) {
                if (error.response.status === 400) {
                    return { resultCode: error.response.data.resultCode.toString(), resultCodeMessage: error.response.data.resultCodeMessage };
                }
                return { resultCode: error.response.status.toString(), resultCodeMessage: error.response.statusText };
            });
        }, function (error) {
            return { resultCode: error.response.status.toString(), resultCodeMessage: error.response.statusText };
        });
    };
    return ApiRest;
}());
exports.default = ApiRest;
