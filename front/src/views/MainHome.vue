<template>
  <div class="main-container">
    <div class="top-right-buttons">
      <a href="">로그인</a>
      <a href="">회원가입</a>
    </div>
    <div class="center-buttons">
      <button class="button calculator-home">계산기 Home</button>
      <button class="button product-home">상품 Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHome",
  
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: auto;
  padding: 2em;
  max-width: 800px;
  background-color: #f5f5f5;
  color: #333;
  position: relative;
}

.top-right-buttons {
  position: absolute;
  top: 2em;
  right: 2em;
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button {
  padding: 0.5em 2em;
  font-size: 1em;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0.5em;
}

.login {
  background-color: #42b983;
}

.login:hover {
  background-color: #2c8d52;
}

.signup {
  background-color: #3498db;
}

.signup:hover {
  background-color: #217dbb;
}

.calculator-home {
  background-color: #9b59b6;
}

.calculator-home:hover {
  background-color: #8e44ad;
}

.product-home {
  background-color: #e67e22;
}

.product-home:hover {
  background-color: #d35400;
}
</style>