<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-3" outlined>
          <v-card-title>정기 적금 상품 계산기</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <!-- 계산 입력 부분 -->
              <v-form ref="form" v-model="valid">
                <!-- 예치 기간 -->
                <v-text-field
                  v-model="savingsPeriod"
                  label="예치 기간"
                  type="number"
                  hint="단위: 개월"
                  :rules="[rules.required]"
                  :suffix="savingsPeriodSuffix"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsPeriod"
                  required
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(1)"
                  >1개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(6)"
                  >6개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(12)"
                  >12개월</v-btn
                >
                <!-- 예치 금액 -->
                <v-text-field
                  :value="formattedSavingsAmount"
                  @input="updateSavingsAmount"
                  label="예치 금액"
                  type="text"
                  hint="단위: 원"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsAmount"
                  required
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsAmout(100000)"
                  >10만원</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsAmout(1000000)"
                  >100만원</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsAmout(10000000)"
                  >1000만원</v-btn
                >
                <v-btn small @click="increaseSavingsAmout(100000000)">1억</v-btn>
                <!-- 이자율 -->
                <v-text-field
                  v-model="savingsRate"
                  label="이자율"
                  type="number"
                  step="0.1"
                  hint="예: 3.5, 3.7"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsRate"
                  required
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsRate(0.1)"
                  >0.1</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsRate(0.5)"
                  >0.5</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsRate(1)">1.0</v-btn>
                <v-switch
                  v-model="savingsIsSimple"
                  label="복리 적용 여부"
                ></v-switch>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  @click="calcRegSavings"
                  >계산하기</v-btn
                >
              </v-form>
            </v-col>
            <v-col cols="12" md="6">
              <!-- 계산 결과 부분 -->
              <v-list>
                <v-list-item>
                  <v-list-item-title>총 이자금액</v-list-item-title>
                  <v-list-item-subtitle>{{
                    savingsTotalInterest
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금 일반 (15.4%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    savingsInterest15
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금우대 (9.5%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    savingsInterest9
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >세금우대 (1.4%) 세후 이자</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    savingsInterest1
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>비과세</v-list-item-title>
                  <v-list-item-subtitle>{{
                    savingsInterest
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
import { SavingsType } from "../lib/type";
const errMessage =
  "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";

export default {
  name: "CalcHome",
  components: {
    AlertDialog,
  },
  data() {
    return {
      valid: true,
      savingsPeriod: 0,
      savingsAmount: 0,
      savingsRate: 0,
      savingsIsSimple: false,
      savingsTotalInterest: 0,
      savingsInterest15: 0,
      savingsInterest9: 0,
      savingsInterest1: 0,
      savingsInterest: 0,
      rules: {
        required: (value) => !!value || "필요한 값입니다.",
      },
      dialog: false,
      dialogMessage: "",
    };
  },
  computed: {
    savingsPeriodSuffix() {
      const years = Math.floor(this.savingsPeriod / 12);
      const months = this.savingsPeriod % 12;
      return `${years}년 ${months}개월`;
    },
    formattedSavingsAmount() {
      return this.savingsAmount.toLocaleString();
    },
  },
  methods: {
    increaseSavingsPeriod(months) {
      this.savingsPeriod = Number(this.savingsPeriod) + months;
    },
    initSavingsPeriod() {
      this.savingsPeriod = 0;
    },
    increaseSavingsAmout(amount) {
      this.savingsAmount = Number(this.savingsAmount) + amount;
    },
    initSavingsAmount() {
      this.savingsPeriod = 0;
    },
    updateSavingsAmount(value) {
      const numberValue = Number(value.replace(/,/g, ""));
      if (!isNaN(numberValue)) {
        this.savingsAmount = numberValue;
      }
    },
    increaseSavingsRate(rate) {
      this.savingsRate = Number((Number(this.savingsRate) + rate).toFixed(1));
    },
    initSavingsRate() {
      this.savingsRate = 0
    },
    // 정기 적금
    async calcRegSavings() {
      let res;
      if (this.$refs.form.validate()) {
        try {
          res = await this.$store.dispatch("CalcRegSavingsDeposit", {
            period: this.savingsPeriod,
            price: this.savingsAmount,
            rate: this.savingstRate,
            isSimple: this.savingsIsSimple,
            type: SavingsType.SAVINGS,
          });
        } catch (err) {
          this.dialogMessage = errMessage;
          this.dialog = true;
          return;
        }
        console.log(res);
      }
    },
    // 정기 예금
    async calcRegDeposit() {},
  },
};
</script>

