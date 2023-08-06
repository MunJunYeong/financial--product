<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="nav-container">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.link"
              @click="item.action && item.action()"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
    items() {
      const baseItems = [
        { title: "홈", link: "/home" },
        { title: "적금 상품", link: "/product" },
        { title: "계산기", link: "/calc" },
      ];

      if (this.user) {
        // 로그인한 상태
        baseItems.push({ title: "내 적금", link: "/list" });
        baseItems.push({ title: "내 정보", link: "/info" });
        baseItems.push({ title: "로그아웃", action: this.logout });
      } else {
        // 로그인하지 않은 상태
        baseItems.push(
          { title: "로그인", link: "/signin" },
          { title: "회원가입", link: "/signup" }
        );
      }

      return baseItems;
    },
  },
  methods: {
    ...mapActions({
      // store에서 LOGOUT action을 매핑
      logout: "Logout",
    }),
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