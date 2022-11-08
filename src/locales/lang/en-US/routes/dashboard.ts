export default {
  dashboard: 'Dashboard',
  about: 'About',
  workbench: 'Workbench',
  analysis: 'Analysis',
  guide: 'Guide',
  defineAW: 'Define AW',
  defineMBT: 'Define Meta Template',
  defineData: 'Define Data Template',
  defineTest: 'Define MBT',
  generateMBT: 'MBT Case Generation',
  dataMonitoring: 'Data Monitoring',

  step1Content: '<h4>Step 1: Define reusable test step abstractions:</h4><ul><li>name：Usually script function or method name</li><li>description：Brief description of steps</li><li>template：Chinese step template, which is used as a text step to generate formatted content</li><li>template_en：English step template\n</li><li>params：Step parameter, used to automate script or text step content replacement</li><li>returnType:Define AW return data type for result judgment (not included in the first stage)\n</li><li>name_hash：The user is invisible. Currently, the name is directly hashed，It means that the name cannot be repeated globally and can be adjusted to path+name\n</li><li>description_hasn：The user is invisible. Currently, the description is NLP processed, and the top 20 words are extracted for hash\n</li></ul><a href="/#/awmodeler">Enter >></a>',
  step2Content: '<h4>Step 2: Define the metamodel shared by a group of use cases, and the type and enumeration of each field</h4><p>The test model can reference the use case meta model template, which can facilitate the user to define the fields required for the final use case generation. When the use case or script is generated, the relevant use case and script fields will be generated according to the template definition.</p><a href="/#/templatemanager/meta">Enter >></a>',
  step3Content: '<h4>Step 3: Define the relevant data required for the test model</h4><p>In principle, data will affect the final output of the business model, which is also an important consideration in test design. The data model can be static or dynamic:</p><ul><li><b>Static data</b> It is a set of defined data lists that users can manually configure according to their own needs. Compared with dynamic data, static data models can be shared across business models.<a href="/#/templatemanager/static">Enter >></a></li><li><b>dynamic data</b>It is used to define data rules and policies (such as pair wise, full permutation, random, etc.) and generate relevant data lists through algorithms. At present, it is mainly a pair policy. The overall reference is Microsoft\'s PICT syntax definition. We mainly provide wizard based modeling. When referenced in the business model, it will be dynamically generated and imported from the model.<a href="/#/templatemanager/dynamic">Enter >></a></li></ul>',
  step4Content: '<h4>Step 4: Define MBT</h4><p>The whole test process is designed by invoking the previously defined model. This includes the following steps:</p><ul><li>Start Node</li><li>End Node</li><li>Step node：1 operation step and one expected result</li><li>Parallel gateway and branch paths need to be covered</li><li>Conditional gateway, select 0~N for branch path according to conditions</li></ul><a href="/#/mbtstore">Enter >></a>',
  step5Content: '<h4>Step 5: Generate MBT use cases</h4><p>Generate corresponding test code or test text as required.</p><ul><li>Support EJS and FreeMarker template engine</li><li>Support the output of Python, JAVA test code, or YAML text cases</li></ul><a href="/#/templatemanager/codegen">Enter >></a>',

  AWUnit: 'AW Unit',
  metaTemp: 'Meta Template',
  MBTTemp: 'MBT',
  codegenTemp: 'Codegen Template',
  staticData: 'Static Data',
  dynamicData: 'Dynamic Data'
};
