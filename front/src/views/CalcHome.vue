<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-3" outlined>
          <v-card-title>정기 적금 상품 계산기</v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <!-- 계산 입력 부분 -->
              <v-text-field
                v-model="depositPeriod"
                label="예치 기간"
                type="number"
                hint="단위: 개월"
                required
              ></v-text-field>
              <v-text-field
                v-model="depositAmount"
                label="예치 금액"
                type="number"
                hint="단위: 원"
                required
              ></v-text-field>
              <v-text-field
                v-model="interestRate"
                label="이자율"
                type="number"
                hint="예: 3.5, 3.7"
                required
              ></v-text-field>
              <v-switch
                v-model="compoundInterest"
                label="복리 적용 여부"
              ></v-switch>
              <v-btn color="primary" @click="calculate">계산하기</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <!-- 계산 결과 부분 -->
              <v-list>
                <v-list-item>
                  <v-list-item-title>총 이자금액</v-list-item-title>
                  <v-list-item-subtitle>{{
                    totalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금 일반 (15.4%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    totalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금우대 (9.5%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    totalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금우대 (1.4%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    totalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>비과세</v-list-item-title>
                  <v-list-item-subtitle>{{
                    totalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-3" outlined>
          <v-card-title>정기 예금 상품 계산기</v-card-title>
          <!-- 정기 예금 상품 계산기 내용 -->
        </v-card>
      </v-col>
    </v-row>
    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="dialog = $event"
    />
  </v-container>
</template>

<script>
import AlertDialog from "@/components/AlertDialog.vue";
import {SavingsType} from "../lib/type"
const errMessage = "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요."

export default {
  name: "CalcHome",
  components: {
    AlertDialog,
  },
  data() {
    return {
      depositPeriod: "",
      depositAmount: "",
      interestRate: "",
      compoundInterest: false,
      rules: {
        required: (value) => !!value || "필요한 값입니다.",
      },
      dialog: false,
      dialogMessage: "",
    };
  },
  methods: {
    // 정기 적금
    async calcRegSavings() {
      let res;
      if (this.$refs.form.validate()) {
        try {
          res = await this.$store.dispatch("CalcRegSavingsDeposit", {
            period : this.depositPeriod,
            price : this.depositAmount,
            rate : this.interestRate,
            isSimple : this.compoundInterest,
            type : SavingsType.SAVINGS
          });
        } catch (err) {
          this.dialogMessage = errMessage
          this.dialog = true;
          return;
        }

      }
    },
    // 정기 예금
    async calcRegDeposit() {},
  },
};
</script>

