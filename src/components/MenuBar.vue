<script setup>

    import { RouterLink } from 'vue-router';

    import {onMounted, ref, watch} from 'vue'
    import TreeItem from './TreeItem.vue'
    import Api from "../api/Api.js";
    import {getTreeData, ModifyObserver, sleep} from "../api/Utils.js";


    const treeData = ref([
      {name: 'LOADING...', children: [{name: '...'}, {name: '...'}]},
      {name: 'LOADING...', children: [{name: '...'}, {name: '...'}]}
    ]);


    onMounted(async function () {

      treeData.value = await getTreeData()


      watch(ModifyObserver, async () => {
        ModifyObserver.isUpdatedContainer = false
        treeData.value = await getTreeData()
      })




    })




</script>


<template>
    
    <div class="partieagauche">
        <h2>Clusters</h2>
        <ul>
            <TreeItem
                class="item"
                v-for="model in treeData"
                :model="model">
            </TreeItem>
        </ul>
    </div>

    <div class="headerAndContent">
        <router-link id="nomClusterHeader" to="/"><h2>VirtUI</h2></router-link>
        <div class="headerButton buttons">
            <router-link class="router-link" to="/container/add">Ajouter un Container</router-link>
            <router-link class="router-link" to="/">Gestion des conteneurs</router-link>
            <router-link class="router-link" to="/cluster">Gestion Clusters</router-link>
            <router-link class="router-link" to="/auth">Connexion/Deconnexion</router-link>
          <router-link class="router-link" to="/about">A propos</router-link>

        </div>
    
        <div class="partieadroite">
            <router-view></router-view>
        </div>
    </div>

</template>

<style>

h2 {
    color: white;
}

#app {
    display: flex;
}

.headerAndContent {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 5vh;
    margin-right: 5vh;
}

.listeContainers > p {
    padding-left: 1em;
}

#nomClusterHeader {
    text-align: center;
    text-decoration: none;
    color: white;
}

.headerButton {
    display: flex;
    justify-content: space-evenly
}

.partieagauche {
    min-height: 100vh;
}

.partieadroite {
    margin-top: 5vh;
}

.router-link {
    padding: 6px 14px;
    border-radius: 6px;
    border: none;

    background: #6E6D70;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
    color: #DFDEDF;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    text-decoration: none;
    margin-bottom: 1em;

}

.router-link.router-link-active
{
  background: orange;
}

.router-link:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}

</style>