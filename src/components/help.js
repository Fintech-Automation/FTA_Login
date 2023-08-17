import React from 'react';
import notification from "antd/es/notification";

import _ from 'lodash'

export const openNotificationWithIcon = (type, message, description) => {
    return notification[type]({
        message: message,
        description: description
    });
};


export const errorCheck = (data, module) => {
    // console.log(data.data[0]+module)
    let isError = false;
    if (!data.data) {
        isError = true;
        openNotificationWithIcon('info', module, 'API Return Null');
        return isError;
    } else if (_.get(data.data[0], 'errorCode') != null) {
        if (data.data[0].errorCode === 'API_Error') {
            isError = true;
            openNotificationWithIcon('info', module + ' API Error', data.data[0].message);
            return isError;
        } else if (data.data[0].errorCode === 'APEX_ERROR') {
            isError = true;
            openNotificationWithIcon('info', module + ' APEX ERROR', data.data[0].message);
            return isError;
        }
    } else if (data.data.length === 0) {
        isError = true;
        openNotificationWithIcon('info', module, 'No UMA Found');
        return isError;
    }
}

export const getAllJsonKeys = (data, field) => {

    let temp_data = [], temp_name=[], field_children=[];
    let field_temp_children_name_list=[];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            temp_data = data[i].children;
            temp_name = data[i].name;
            field_children = [];
            let name = data[i].name;

            while (temp_data.length > 0) {
                if (temp_name === field){

                    // console.log('temp_data', temp_data)

                    for (let t = 0; t < temp_data.length; t++) {
                        let field_temp_children = temp_data[t].children;
                        let field_temp_children_name = temp_data[t].name;
                        while (field_temp_children.length > 0) {
                            let field_temp_children_inner=[];
                            for (let j = 0; j < field_temp_children.length; j++) {

                                if (field_temp_children[j].children.length>0){
                                    field_temp_children_inner = field_temp_children[j].children
                                }

                                if (field_temp_children_name){
                                    field_temp_children_name = field_temp_children_name+','+ field_temp_children[j].name;
                                } else {
                                    field_temp_children_name = field_temp_children[j].name;
                                }
                            }

                            if (field_temp_children_inner.length>0){
                                field_temp_children = field_temp_children_inner
                            } else {
                                field_temp_children = []
                            }

                        }

                        field_temp_children_name_list = field_temp_children_name_list+ ',' + field_temp_children_name
                    }
                    break;
                }
                let temp_data_inner = [], temp_data_inner_names=[];
                for (let k = 0; k < temp_data.length; k++) {
                    // check if nested children is not empty
                    if (temp_data[k].children.length > 0) {
                        temp_data_inner = temp_data[k].children
                        temp_data_inner_names = temp_data[k].name
                    }
                }
                // stopper
                if (temp_data_inner.length > 0) {
                    temp_data = temp_data_inner
                    temp_name = temp_data_inner_names
                } else {
                    temp_data = []
                }
            }
        }
    }

    // console.log('keys', field_temp_children_name_list)


    return field_temp_children_name_list
}

export function queryURLString(params = {}) {
    const searchParams = Object.entries(params);
    const searchParamsStr = searchParams.map(([k, v]) => {
            let isObject = false;
            if (v instanceof Object) {
                isObject = true;
            }
            return `${encodeURIComponent(k)}=${
                isObject ? JSON.stringify(v) : v
            }`;
        }).join("&");
    return `?${searchParamsStr}`;
}

export function parseURLString(url) {
    const searchParams = decodeURIComponent(url).split("#")[1].split("&");
    let params = {};
    searchParams.forEach((param) => {
        const [k, v] = param.split("=");
        params[k] = v;
    })
    return params;
}