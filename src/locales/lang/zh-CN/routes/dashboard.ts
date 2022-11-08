export default {
  dashboard: '仪表盘',
  about: '关于',
  workbench: '工作台',
  analysis: '分析页',
  guide: '使用向导',
  defineAW: '定义 AW',
  defineMBT: '定义用例元模型',
  defineData: '定义数据模型',
  defineTest: '定义测试模型',
  generateMBT: 'MBT用例生成',
  dataMonitoring: '数据监控',

  step1Content: '<h4>Step 1: 定义可重复利用的测试步骤抽象:</h4><ul><li>name：通常为脚本函数/方法名</li><li>description：步骤简要说明</li><li>template：中文步骤模版，模版作为文本步骤生成格式化内容</li><li>template_en：英文步骤模版\n</li><li>params：步骤参数，用于自动化脚本或文本步骤内容替换</li><li>returnType定义AW返回数据类型，用于结果判断（第一阶段未包含）\n</li><li>name_hash：用户不可见，当前对name直接进行hash，意味着name全局不可重复，可以调整为path+name\n</li><li>description_hasn：用户不可见，当前对description 进行NLP处理，提取top 20单词进行hash\n</li></ul><a href="/#/awmodeler">进入 >></a>',
  step2Content: '<h4>Step 2: 定义一组用例共享的元模型，每个字段的类型、枚举等</h4><p>测试模型可以引用用例元模型模版，这样可以方便用户定义最终用例生成所需要的字段用例或者脚本生成的时候会根据模版定义内容来生成相关用例、脚本字段。</p><a href="/#/templatemanager/meta">进入 >></a>',
  step3Content: '<h4>Step 3: 定义测试模型所需的相关数据</h4><p>数据原则上会影响业务模型的最终输出，也是测试设计的重要考虑因素。数据模型可以是静态的或者动态的：</p><ul><li><b>静态数据</b> 是一组定义的数据列表，用户可以根据自己的需求手动配置。和动态数据相比，静态数据模型可以跨业务模型共享。<a href="/#/templatemanager/static">进入 >></a></li><li><b>动态数据</b> 是定义数据规则和策略（比如pairwise、全排列、随机等）通过算法生成相关数据列表。当前主要还是pairwise策略，整体参考微软的PICT语法定义，我们主要是提供向导式建模。业务模型中引用的时候会从模型中动态生成导入。<a href="/#/templatemanager/dynamic">进入 >></a></li></ul>',
  step4Content: '<h4>Step 4: 定义测试模型</h4><p>通过调用之前定义好的模型来设计整个测试流程。其中包括以下步骤：</p><ul><li>起始节点</li><li>结束节点</li><li>步骤节点：1个操作步骤，可选一个预期结果</li><li>并行网关，分支路径都需要覆盖</li><li>条件网关，分支路径根据条件进行选择0~N</li></ul><a href="/#/mbtstore">进入 >></a>',
  step5Content: '<h4>Step 5: 生成MBT用例</h4><p>根据需要生成相应的测试代码或测试文本。</p><ul><li>支持EJS，FreeMarker模板引擎</li><li>支持输出Python, JAVA测试代码，或YAML格式的文本用例</li></ul><a href="/#/templatemanager/codegen">进入 >></a>',

  AWUnit: 'AW 单元',
  metaTemp: '元模型',
  MBTTemp: '测试模型',
  codegenTemp: 'Codegen模型',
  staticData: '静态数据',
  dynamicData: '动态数据'
};
