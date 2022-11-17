export const data = {
    "currentData": {
        "url": "test2",
        "file": "\"test\"",
        "resolution": "4K",
        "videotype": "本地视频",
        "key": 0
    },
    "resources": [],
    "data": [
        {
            "step": {
                "input": {
                    "_id": "635e7d705aa1c2ce2d9e8a5f",
                    "name": "download_video",
                    "description": "download_video",
                    "tags": "",
                    "template": "file:{{url}}",
                    "file": "{{url}}"
                },
                "aw": {
                    "name": "download_video123",
                    "description": "download_video",
                    "name_hash": "c6106176ba9ec4ce68d32efb7da56a4bb80685e74821826890df30dd095fcbe6",
                    "description_hash": "2ac8a29121cb40382130416cf466260cae16240f87daa406631697162b0895cb",
                    "path": "/NewNode",
                    "tags": [],
                    "template": "download_video {{file}}",
                    "template_en": "",
                    "params": [
                        {
                            "name": "file",
                            "type": "str",
                            "enum": [],
                            "_id": "635e7d705aa1c2ce2d9e8a60"
                        }
                    ],
                    "_id": "635e7d705aa1c2ce2d9e8a5f"
                }
            },
            "expectation": null
        },
        {
            "step": {
                "input": {
                    "_id": "635e7da45aa1c2ce2d9e8a61",
                    "name": "TBL_play_video_and_recording",
                    "description": "TBL_play_video_and_recording",
                    "tags": "VIDEO 多媒体 ",
                    "template": "TBL_play_video_and_recording"
                },
                "aw": {
                    "name": "TBL_play_video_and_recording",
                    "description": "TBL_play_video_and_recording",
                    "name_hash": "cba7cfa1be4837549c5162ba335bbe5910b6ce176a3f5ac7e5a476bcbcfe3c5f",
                    "description_hash": "4a577fc539510a4ecdc0e1a3a51bc6719bbe001cc502210da86448f5210067e8",
                    "path": "",
                    "tags": [
                        "VIDEO",
                        "多媒体"
                    ],
                    "template": "TBL_play_video_and_recording",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7da45aa1c2ce2d9e8a61"
                }
            },
            "expectation": null
        },
        {
            "step": {
                "input": {
                    "_id": "635e7e125aa1c2ce2d9e8a63",
                    "name": "check_video_playing_result",
                    "description": "check_video_playing_result. not stopping or lost frames",
                    "tags": "",
                    "template": ""
                },
                "aw": {
                    "name": "check_video_playing_result",
                    "description": "check_video_playing_result. not stopping or lost frames",
                    "name_hash": "342a603e51b79409b1a5f5bd54afc0ab35e86f55bafc4803bcbfa4ce7d0aabb5",
                    "description_hash": "ece55f0b6ee4a5aea32a5f3277eb3e81c5439e91d2045fa44be3bda67e78b4ee",
                    "path": "",
                    "tags": [],
                    "template": "check_video_playing_result. not stopping or lost frames",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7e125aa1c2ce2d9e8a63"
                }
            },
            "expectation": {
                "input": {
                    "_id": "635e7e2e5aa1c2ce2d9e8a64",
                    "name": "display_video_without_error",
                    "description": "display_video_without_error",
                    "tags": "",
                    "template": ""
                },
                "aw": {
                    "name": "display_video_without_error",
                    "description": "display_video_without_error",
                    "name_hash": "60fc25eb1ce65420bde97e71eb46aab2b687a2e2118ac99fa138ec70b4407dcd",
                    "description_hash": "962c058e8ed5769cc59d36e02ec3fde699f5bec451af644d78d8f31c221b150f",
                    "path": "",
                    "tags": [],
                    "template": "display_video_without_error",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7e2e5aa1c2ce2d9e8a64"
                }
            }
        },
        {
            "step": {
                "input": {
                    "_id": "635e7e455aa1c2ce2d9e8a65",
                    "name": "video_forward",
                    "description": "video_forward",
                    "tags": "",
                    "template": ""
                },
                "aw": {
                    "name": "video_forward",
                    "description": "流媒体快进",
                    "name_hash": "c64ad20abd30c2ffff163b95ea7d2c664c5bb3b066507e51f033eabe91ac3659",
                    "description_hash": "e16427b8b848da83feb7b37e0a4aae453ac2eb9f29b8c5bef8e6530d66d82e62",
                    "path": "",
                    "tags": [],
                    "template": "video_forward",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7e455aa1c2ce2d9e8a65"
                }
            },
            "expectation": null
        },
        {
            "step": {
                "input": {
                    "_id": "635e7e525aa1c2ce2d9e8a66",
                    "name": "video_backward",
                    "description": "视频快退",
                    "tags": "",
                    "template": "video_backward"
                },
                "aw": {
                    "name": "video_backward",
                    "description": "视频快退",
                    "name_hash": "aa87a1269b0c99df8f95e5f16edaf7223a9a1488ceb22c36fd0a37aec7f9beeb",
                    "description_hash": "84f71cfe5125a310c5281678ae0fd9f3935b458d2b8aceedf2dc4e051c486cc7",
                    "path": "",
                    "tags": [],
                    "template": "video_backward",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7e525aa1c2ce2d9e8a66"
                }
            },
            "expectation": null
        },
        {
            "step": {
                "input": {
                    "_id": "635e7e2e5aa1c2ce2d9e8a64",
                    "name": "display_video_without_error",
                    "description": "display_video_without_error",
                    "tags": "",
                    "template": "display_video_without_error"
                },
                "aw": {
                    "name": "display_video_without_error",
                    "description": "display_video_without_error",
                    "name_hash": "60fc25eb1ce65420bde97e71eb46aab2b687a2e2118ac99fa138ec70b4407dcd",
                    "description_hash": "962c058e8ed5769cc59d36e02ec3fde699f5bec451af644d78d8f31c221b150f",
                    "path": "",
                    "tags": [],
                    "template": "display_video_without_error",
                    "template_en": "",
                    "params": [],
                    "_id": "635e7e2e5aa1c2ce2d9e8a64"
                }
            },
            "expectation": null
        }
    ],
    "meta": [
        {
            "title": "testid",
            "content": "oooo.{{key}}"
        },
        {
            "title": "id",
            "content": "test.{{key}}"
        }
    ]
}