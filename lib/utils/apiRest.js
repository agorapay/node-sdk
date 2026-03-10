"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ApiRest {
    constructor(config) {
        this.config = config;
    }
    json_fields_toString(payload) {
        Object.keys(payload).forEach(key => {
            if (payload[key] !== undefined) {
                if (payload[key].encode) {
                    payload[key] = payload[key].encode();
                }
                else if (typeof payload[key] === 'object') {
                    this.json_fields_toString(payload[key]);
                }
                else {
                    payload[key] = payload[key].toString();
                }
            }
        });
    }
    sendToApiPost(endPoint, payload, multiPart = false) {
        const BASE_URL = this.config.baseUrl;
        const url = BASE_URL + endPoint;
        this.json_fields_toString(payload);
        let boundary = null;
        if (multiPart) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const FormData = require('form-data');
            const form_data = new FormData();
            boundary = form_data.getBoundary();
            form_data.append('json', JSON.stringify(payload.json || {}), { contentType: 'application/json; charset=UTF-8' });
            if (payload.files) {
                payload.files.forEach((x) => {
                    form_data.append(x.name, Buffer.from(x.data).toString('base64'), { header: { 'Content-Transfer-Encoding': 'base64' }, filename: x.fileName });
                });
            }
            payload = form_data.getBuffer();
        }
        const message = {
            method: 'post',
            url: url,
            data: payload,
            timeout: this.config.timeout,
            validateStatus: function (status) { return status == 200 || status == 401; }
        };
        message.headers = {
            'Authorization': `Bearer ${this.config.tokenValue}`,
            'id_token': `${this.config.tokenId}`
        };
        if (multiPart) {
            message.headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
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
    }
    sendToApiGet(endPoint, payload) {
        const BASE_URL = this.config.baseUrl;
        const url = BASE_URL + endPoint;
        const message = {
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
            'Authorization': `Bearer ${this.config.tokenValue}`,
            'id_token': `${this.config.tokenId}`
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
    }
    sendRequest(message, success, failure) {
        return axios_1.default.request(message).then((res) => {
            return success(res, this);
        }).catch((error) => {
            return failure(error, this);
        });
    }
    authenticate(message, retry = false) {
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
            message.headers['Authorization'] = `Bearer ${api.config.tokenValue}`;
            message.headers['id_token'] = `${api.config.tokenId}`;
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
    }
}
exports.default = ApiRest;
