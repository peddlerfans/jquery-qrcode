import request from '@/utils/request';


export default function query(url: string, data?: any, checked?: boolean) {
  let rst;
  if (data && data.search.toString().substring(0, 6) == '@tags:' && checked == true) {
    // 判断空格出现的次数
    let searchCount = data.search.split(" ").length - 1;
    // 如果空格数大于二，则截取第二个空格之后的字符
    if (searchCount == 2) {
      let searchIndex = find(data.search, " ", 1)
      let advancedSearch = data.search.substring(searchIndex + 1)
      rst = request.get("/api/hlfs" + `?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim(), { params: { search: advancedSearch } })
    } else {
      rst = request.get("/api/hlfs" + `?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim())
    }
  } else {
    rst = request.get("/api/hlfs", { params: data })
  }
}
// 定义查询输入值时的空格
function find(str: string | any[], cha: any, num: number) {
  var x = str.indexOf(cha);
  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}