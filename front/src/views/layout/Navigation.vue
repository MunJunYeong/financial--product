<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="2" class="nav-container">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.link"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="9" class="content">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  data() {
    return {
      items: [
        { title: "홈", link: "/home" },
        { title: "적금 상품", link: "/product" },
        { title: "계산기", link: "/calc" },
        { title: "내 적금", link: "/list" },
        { title: "로그인", link: "/signin" },
        { title: "회원가입", link: "/signup" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-container {
  background: #eee;
}

.content {
  background: #fff;
}
</style>