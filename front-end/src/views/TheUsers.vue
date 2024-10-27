<template>
    <div class="flex-grow-1 bg-[url('@/assets/imgs/BgColor.png')] flex h-screen bg-cover">

        
        <div class="bg-black h-full w-[74px]"></div> <!--Simulação Barra lateral-->
            
        <div class="flex-grow bg-pink-300">
        <div class='h-56 bg-orange-400 '> <!-- Div Superior -->
            
    <div class="justify-items-center mt-0">
        <h class='text-[2.0rem] center'>Usuários</h>
        <hr class='w-[14rem] mt-2 -mb-3 border-black border-1.5'>
        <p class='mt-6'>Selecione o que você deseja cadastrar ou atualizar</p>
    </div>

    <div class="flex mt-[4.17vw] ml-[2.85vw] font-bold items-center"> <!-- Div engloba Barra filtros e botao cadastrar -->
        
        <!-- Div Barra filtros -->
        <div class="flex items-center bg-neutral-200 bg-opacity-40"> 

            <!-- Icone Filtro -->
            <div class="border rounded-l-lg w-16 h-[3.35rem] border-gray-300 flex justify-center items-center">
                <img class="w-6 h-[1.57vw]" src="../assets/imgs/filter.png" alt="logo">
            </div>

            <!-- Filtro -->
            <div class="border border-gray-300 w-28 h-[3.35rem] flex justify-center items-center">
                <p class="text-[0.87vw]">Filtro</p>
            </div>

            <!-- Data -->
            <div class="border border-gray-300 w-32 h-[3.35rem] flex justify-center items-center">
                <p class="text-[0.87vw]">Data</p>
                <img class="ml-8" src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Ordenar por -->
            <div class="border border-gray-300 w-40 h-[3.35rem] flex justify-center items-center">
                <p class="text-[0.87vw]">Ordenar Por</p>
                <img class="ml-8" src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Status -->
            <div class="border border-gray-300 w-44 h-[3.35rem] flex justify-center items-center">
                <p class="text-[0.87vw]">Status</p>
                <img class='ml-16' src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Limpar Filtro -->
            <div class="rounded-r-lg border border-gray-300 w-40 h-[3.35rem] flex justify-center items-center">
                <img class="h-4 w-4 mr-2" src="../assets/imgs/back.png" alt="logo">
                <p class="text-[0.87vw] text-red-600">Limpar Filtro</p>
            </div>
        </div>

        <!-- Botão -->
        <button class="bg-teal-600 bg-opacity-50 text-sm w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85vw]">
            + CADASTRAR USUÁRIO
        </button>

    </div>
    </div>
    
    
    
    <div> <!--Div Inferior-->
        <div class='w-  bg-red-400'> <!--Div quadro-->
            
            <div> <!--Div Lista Topicos-->
                
                
                <div></div> 
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
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
