<template>
  <div class="bottom_container">
    <p>Copyright © 2023 POLARIS  polaris.com All Rights Reserved.</p>
  </div>
</template>

<style scoped lang="scss">
* {
    border: 0;
    padding: 0;
    margin: 0;
}
p {
    margin-block: 0;
}

body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.bottom_container {
    position: fixed;
    width: 100vw;
    height: 80px;

    left: 0;
    bottom: 0;

    background-color: #31384f;
    text-align: center;

    z-index: 101;

    p{
        font-size: 16px;
        color: #ffffff;

        line-height: 80px;
    }
}
</style>