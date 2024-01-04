<template>
        <div class="not-found-container">
                <h1>404</h1>
                <p>Page Not Found</p>
                <img src="https://example.com/not-found-image.png" alt="Not Found Image">
        </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style scoped>
div {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
}

.not-found-container {
        text-align: center;
}

.not-found-container h1 {
        font-size: 4em;
        color: #333;
        margin: 0;
}

.not-found-container p {
        font-size: 1.2em;
        color: #555;
}

.not-found-container img {
        width: 100%;
        max-width: 400px;
        margin-top: 20px;
}
</style>