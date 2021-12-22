<template>
    <div class="listview">
        <listview-top :playlist="state.playlist"></listview-top>
        <play-list :playlist="state.playlist"></play-list>
    </div>
    
</template>
<script>
import {getPlayListDetail} from '@/api/index.js';
import {onMounted, reactive, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import ListviewTop from '../components/ListviewTop.vue'
import PlayList from '../components/PlayList.vue'
import store from '@/store/index.js'

export default {
    name: 'listView',
    components: {
        ListviewTop,
        PlayList
    },
    setup(ctx, props) {
        const route = useRoute();
        let state = reactive({
            list: [],
            playlist: {
                creator: {},
                tracks: []
            }
        })
        onMounted(async() => {
            console.log('listview mounted')
            let id = route.query.id;
            let res = await getPlayListDetail(id);
            state.playlist = res.data.playlist;
            store.commit('reset')
            store.commit('setPlaylist', state.playlist.tracks)
        })

        return {
            state
        }
    }
}
</script>