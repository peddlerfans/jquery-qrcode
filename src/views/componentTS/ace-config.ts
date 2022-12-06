import ace from 'ace-builds';

import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);

import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);

import modeJavaUrl from 'ace-builds/src-noconflict/mode-java?url';
ace.config.setModuleUrl('ace/mode/java', modeJavaUrl);

import modeEjsUrl from 'ace-builds/src-noconflict/mode-ejs?url';
ace.config.setModuleUrl('ace/mode/ejs', modeEjsUrl);

import modeFreemarkerUrl from 'ace-builds/src-noconflict/mode-ftl?url';
ace.config.setModuleUrl('ace/mode/ftl', modeFreemarkerUrl);

import modePythonUrl from 'ace-builds/src-noconflict/mode-python?url';
ace.config.setModuleUrl('ace/mode/python', modePythonUrl);

import modeYamlUrl from 'ace-builds/src-noconflict/mode-yaml?url';
ace.config.setModuleUrl('ace/mode/yaml', modeYamlUrl);

import modeHtmlUrl from 'ace-builds/src-noconflict/mode-html?url';
ace.config.setModuleUrl('ace/mode/html', modeHtmlUrl);


import themeSQLUrl from 'ace-builds/src-noconflict/theme-sqlserver?url';
ace.config.setModuleUrl('ace/theme/sqlserver', themeSQLUrl);

import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url';
ace.config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl);

import workerBaseUrl from 'ace-builds/src-noconflict/worker-base?url';
ace.config.setModuleUrl('ace/mode/base', workerBaseUrl);

import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url';
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);

import workerYamlUrl from 'ace-builds/src-noconflict/worker-yaml?url';
ace.config.setModuleUrl('ace/mode/yaml_worker', workerYamlUrl);

import workerJavascriptUrl from 'ace-builds/src-noconflict/worker-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);

import workerHtmlUrl from 'ace-builds/src-noconflict/worker-html?url';
ace.config.setModuleUrl('ace/mode/html_worker', workerHtmlUrl);

import searchBoxUrl from 'ace-builds/src-noconflict/ext-searchbox?url';
ace.config.setModuleUrl('ace/ext/searchbox', searchBoxUrl);