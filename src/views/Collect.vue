<template>
  <div>
    <div style="margin-top: 100px">
      <p v-if="collectionKind === 'productCollection'">
        Collect
      </p>
      <p v-if="collectionKind === 'inspirationCollection'">
        Inspiration
      </p>
      <p v-if="collectionKind === 'commentCollection'">
        Comment
      </p>

      <div>
        <router-link to="/collect/product-collection">
          Product Collection
        </router-link>
        <router-link to="/collect/inspiration-collection">
          Inspiration Collection
        </router-link>
        <router-link to="/collect/forum-collection">
          Forum Collection
        </router-link>
      </div>

      <div>
        <component :is="dynamicComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCollection from '@/components/ProductCollection.vue'
import ForumCollection from '@/components/ForumCollection.vue';
import InspirationCollection from '@/components/InspirationCollection.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    beforeRouteUpdate(to, from, next) {
        this.loadComponent(to.params.collectionKind);
        next();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.loadComponent(to.params.collectionKind);
        });
    },
    data() {
        return {
            collectionKind: '',
            dynamicComponent: null,
        };
    },
    methods: {
        loadComponent(collectionKind) {
            let componentToLoad = null;

            switch (collectionKind) {
            case 'product-collection':
                componentToLoad = ProductCollection;
                break;
            case 'forum-collection':
                componentToLoad = ForumCollection;
                break;
            case 'inspiration-collection':
                componentToLoad = InspirationCollection;
                break;
            }

            this.collectionKind = collectionKind;
            this.dynamicComponent = componentToLoad;
        },
    },
});
</script>

<style lang="scss" scoped>

</style>
