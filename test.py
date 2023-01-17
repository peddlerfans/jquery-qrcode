from olib_aw.uils import set_as_tc
from olib_aw.teams.itea.AON import set_test_model, download_push_file, get_face_gaze, check_recognize_result
from olib_aw.teams import is_explorer, is_support, get_test_folder, close_test_model

# Current Data
ExceptResult = "65537"
is_support = "False"
is_explorer = "False"
Covering = "glasses"
Brightness = "300lux"
LeftRightYam = "-20°"
DownUpMove = "+15°"
LeftRightMove = "+15°"
Distance = "30cm"


@set_as_tc(
  id = "test.4",
  testcase_name = "30cm +15° +15° 300lux -20° glasses"
)
class test4:
    def main():
        # 测试步骤1：判断AON是否为explorer方案
        is_explorer()
        # 测试步骤2：判断版本是否支持AON
        is_support()
        # 测试步骤3：获取指定测试数据的文件夹
        get_test_folder(Distance, LeftRightMove, DownUpMove, LeftRightYam, Brightness, Covering)

    def initialize__testcase():
        # 测试步骤1：开启AON测试模式
        set_test_model()

    def uninitialize__testcase():
        # 测试步骤1：关闭AON测试模式
        close_test_model()

if __name__ == "__main__":
    tc = test4()
    tc.execute()