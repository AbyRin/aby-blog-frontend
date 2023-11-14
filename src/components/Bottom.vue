<template>
    <div class="bottom_container">
        <p>Copyright © 2023 AbyBlog  abyblog.com All Rights Reserved.</p>
    </div>
</template>

<style scoped>
* {
    border: 0;
    padding: 0;
}
p {
    margin-block: 0;
}

.bottom_container {
    position: relative;
    width: 100%;
    height: 80px;
    
    bottom: 0;

    background-color: #31384f;
    text-align: center;

    z-index: 101;
}
.bottom_container p{
    font-size: 16px;
    color: #ffffff;

    line-height: 80px;
}
</style>