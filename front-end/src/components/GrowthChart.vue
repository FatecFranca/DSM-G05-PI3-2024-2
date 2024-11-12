<template>
  <div ref="chartContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
import { AgCharts } from 'ag-charts-community';

export default {
  props: {
    growthData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    // Método para criar o gráfico
    createChart() {
      // Verifica se growthData está vazio ou se contém dados malformados
      const data = this.growthData.map(item => ({
        year: item.year || 'N/A',  // Garantir que o 'year' sempre tenha um valor
        weight: item.weight || 0,   // Valor padrão se 'weight' estiver ausente
        height: item.height || 0,   // Valor padrão se 'height' estiver ausente
        circumference: item.circumference || 0, // Valor padrão se 'circumference' estiver ausente
        production: item.production || 0,   // Valor padrão se 'production' estiver ausente
        nutrition: item.nutrition || 0,   // Valor padrão se 'nutrition' estiver ausente
      }));

      // Configurações do gráfico
      const options = {
        container: this.$refs.chartContainer,
        title: {
          text: 'Curvas de Crescimento da Vaca',
        },
        subtitle: {
          text: 'Peso, altura e circunferência ao longo dos anos',
        },
        data: data, // Usando os dados mapeados com valores padrão
        theme: {
          overrides: {
            line: {
              series: {
                interpolation: {
                  type: 'monotone',
                  position: 'middle',
                },
                marker: {
                  enabled: true,
                },
                tooltip: {
                  renderer: ({ datum, xKey, yKey }) => {
                    const date = new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'short',
                    }).format(datum[xKey]);

                    // Verificação para garantir que 'datum[yKey]' esteja definido
                    const value = datum[yKey] !== undefined ? datum[yKey].toFixed(0) : 'N/A';

                    return { content: `${date}: ${value}` };
                  },
                },
              },
            },
          },
        },
        series: [
          {
            type: 'line',
            xKey: 'year',
            yKey: 'weight',
            yName: 'Peso (kg)',
          },
          {
            type: 'line',
            xKey: 'year',
            yKey: 'height',
            yName: 'Altura (cm)',
          },
          {
            type: 'line',
            xKey: 'year',
            yKey: 'circumference',
            yName: 'Circunferência (cm)',
          },
          {
            type: 'line',
            xKey: 'year',
            yKey: 'production',
            yName: 'Produção',
          },
          {
            type: 'line',
            xKey: 'year',
            yKey: 'nutrition',
            yName: 'Alimentação',
          },
        ],
        axes: [
          {
            position: 'bottom',
            type: 'time',
            min: new Date(2000, 0, 1),
            max: new Date(2030, 0, 1),
            nice: false,
            crosshair: {
              label: {
                format: '%b %Y',
              },
            },
            crossLines: [
              {
                type: 'line',
                value: new Date(2024, 0, 1),
                label: {
                  text: 'Dias Atuais',
                  padding: 10,
                },
              },
              {
                type: 'line',
                value: new Date(2027, 0, 1),
                label: {
                  text: 'Expectativa',
                  padding: 10,
                },
              },
            ],
          },
          {
            position: 'right',
            type: 'number',
            title: {
              text: 'ktoe',
            },
            label: {
              formatter: (params) => `${params.value / 1000}K`,
            },
          },
        ],
      };

      // Criando o gráfico com as opções configuradas
      this.chart = AgCharts.create(options);
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy(); // Limpeza ao destruir o componente
    }
  },
};
</script>
