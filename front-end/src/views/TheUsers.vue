<template>
    <div class=""> 

    <div class='h-56  w-screen bg-blue-800' b> <!--Div Superior-->
        <div class="justify-items-center">
        <h class='text-4xl center bg-white mx-28 '>Usuários</h>
        <p class='mt-6'>Selecione o que você deseja cadastrar ou atualizar</p>
    </div>
    
    <div class="flex bg-amber-400 mt-20 ml-10 font-bold"> <!--Div engloba Barra filtros e botao cadastrar-->
    <div class="flex bg-lime-600  items-center"> <!--Div Barra filtros-->
        <div class=" bg-pink-400  border border-gray-400"> <img class=" mx-7 my-3.5" src="../assets/imgs/filter.png" alt="logo"> </div>
        <div class=" bg-pink-400  border border-gray-400"> <p class="mx-7 my-3.5">Filtro</p> </div>
        <div class="flex bg-pink-400  border border-gray-400"> <p class="mx-7 my-3.5">Data</p> <img class=" mx-7 my-3.5" src="../assets/imgs/arrow.png" alt="logo"> </div>
        <div class="flex bg-pink-400  border border-gray-400"> <p class="mx-7 my-3.5">Status</p> <img class=" mx-7 my-3.5" src="../assets/imgs/arrow.png" alt="logo"></div>
        <div class="flex bg-pink-400  border border-gray-400"> <img class=" mx-7 my-3.5" src="../assets/imgs/arrow.png" alt="logo"> <p class="mx-7 my-3.5">Limpar Filtro</p>  </div>
        <div class="flex bg-pink-400  border border-gray-400"> <p class="mx-7 my-3.5">Ordenar Por</p> </div>
    </div>
        
            <button> + CADASTRAR USUÁRIO</button>
        
    </div>
        <div>
            </div>
        </div>
        

    <div> <!--Div Inferior-->
        <div> <!--Div quadro-->
            
        <div> <!--Div Lista Topicos-->
        </div>
        
        <div></div> 
        <div></div>
        <div></div>
        <div></div>
        </div>
    </div>

    </div>
</template>

<script>
export default {
    name: 'TheUsers',
};
</script>

<style scoped></style>
