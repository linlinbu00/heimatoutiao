<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请填写手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon> <Icon icon="shouji"></Icon> </template
      ></van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="验证码"
        :rules="rules.code"
        :maxlength="6"
        required
      >
        <template #left-icon>
          <Icon icon="yanzhengma"></Icon>
        </template>
        <template #button>
          <van-count-down
            :time="3000"
            format="ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="mini"
            native-type="button"
            class="send-sms-btn"
            @click="sendSmsCode"
            :loading="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      // 写法一：要绑定name才行
      // username: "",
      // password: "",
      // 写法二
      isShowCountDown: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      // 校验
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式有误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
      isDisabled: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登陆成功");
        // this.$toast('')
      } catch (error) {
        Toast.fail(error?.response?.data?.message || "服务器端错误");
      }
      // console.log(res);
    },
    async sendSmsCode() {
      try {
        // 1-首先要通过验证
        // ref获取表单实例 通过name属性进行校验
        await this.$refs.form.validate("mobile");
      } catch (error) {
        // 验证失败 直接不进行下面操作
        console.log(error);
        return;
      }
      try {
        // 2-调用获取验证码接口
        this.isDisabled = true;
        await getSmsCode(this.user.mobile);
        // 展示倒计时
        this.isShowCountDown = true;
        this.$toast.success("发送验证码成功");
        // console.log("验证码发送中...");
      } catch (error) {
        this.$toast.fail(error?.response?.data?.message || "出错了");
        this.isShowCountDown = false;
        // console.log(error);
      } finally {
        // 无论成功或者失败都会进行的逻辑
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
