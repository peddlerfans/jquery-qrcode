export const data = {
    "__case_id":0,
    "data": [
        {
            "step": {
                "input": {
                    "username": "{{username}}",
                    "passwd": "{{passwd}}"
                },
                "aw": {
                    "description": "用户登录",
                    "template": "用户登录输入{{username}}和{{password}}",
                    "params": [
                        {
                            "name": "username",
                            "type": "str"
                        },
                        {
                            "name": "passwd",
                            "type": "str"
                        }
                    ],
                    "name": "login_with_credential",
                    "path": "/login"
                }
            }
        },
        {
            "step": {
                "input": {
                    "isLoginSuccess": true
                },
                "aw": {
                    "description": "用户登录成功后跳转",
                    "template": "用户登录成功后跳转{{redirctUrl}}",
                    "params": [
                        {
                            "name": "redirctUrl",
                            "type": "str"
                        }
                    ],
                    "name": "login_redirect",
                    "path": "/login/success"
                }
            },
            "expectation": {
                "input": {
                    "routePath": "{{routePath}}"
                },
                "aw": {
                    "description": "加载页面",
                    "template": "加载页面{{routePath}}",
                    "params": [
                        {
                            "name": "routePath",
                            "type": "str"
                        }
                    ],
                    "name": "loading_page",
                    "path": "/login/success/routepath"
                }
            }
        },
        {
            "step": {
                "input": {
                    "isLoginSuccess": false
                },
                "aw": {
                    "description": "用户登录失败返回提示",
                    "template": "用户登录失败返回提示{{errorUrl}}",
                    "params": [
                        {
                            "name": "errorUrl",
                            "type": "str"
                        }
                    ],
                    "name": "login_failed",
                    "path": "/login/failed"
                }
            },
            "expectation": {
                "input": {
                    "routePath": "{{routePath}}"
                },
                "aw": {
                    "description": "加载页面",
                    "template": "加载页面{{routePath}}",
                    "params": [
                        {
                            "name": "routePath",
                            "type": "str"
                        },
                        {
                            "name": "error_msg",
                            "type": "str"
                        }
                    ],
                    "name": "loading_page",
                    "path": "/login/failed/routepath"
                }
            }
        }
    ],
    "currentData": {
        "videotype": "在线视频",
        "fps": "60",
        "description": "video",
        "typeformat": "3GP/3G2+H.263",
        "id": "002",
        "resolution": "480x854",
        "url": "{{DS.MultiMedia.videos.video_2k}}"
    },
    "resources": [
        {
            "default": "true",
            "alias": "client1",
            "class": "Android",
            "resourceType": "ITEADemo.android"
        },
        {
            "default": "false",
            "alias": "phone2",
            "class": "Android",
            "resourceType": "ITEADemo.android"
        },
        {
            "default": "false",
            "alias": "phone3",
            "class": "Android",
            "resourceType": "ITEADemo.android"
        }
    ],
    "meta": [
        {
            "title": "id",
            "content": "oppo.test.android.video_quality_{{id}}"
        },
        {
            "title": "description",
            "content": "测试视频质量，视频帧速率{{fps}},分辨率为{{resolution}}"
        },
        {
            "title": "objective",
            "content": "播放帧速率{{fps}},分辨率为{{resolution}}视频不卡顿不花屏"
        }
    ],
    "errors": [

    ],
    "prefix": ""
}