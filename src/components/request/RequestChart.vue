<template>
  <div>
    <table class="fio-table">
      <thead>
        <tr>
          <th>FIO</th>
          <th>Summa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, fio) in aggregatedData" :key="fio" @click="viewUser(user)">
          <td>{{ fio }}</td>
          <td>{{ user.sum }}</td>
        </tr>
      </tbody>
    </table>
    <h2 style="text-align:center;font-size:50px;  ">Our Chart</h2>

    <div class="chart-container">
      <Pie :data="computedChartData" :options="chartOptions" />  
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  props: ['requests'],
  name: 'PieChart',
  components: {
    Pie
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    });

    const aggregateData = (requests) => {
      const aggregated = {};

      requests.forEach(request => {
        const summa = Number(request.Summa);
        if (aggregated[request.fio]) {
          aggregated[request.fio].sum += summa;
          aggregated[request.fio].requests.push(request);
        } else {
          aggregated[request.fio] = { sum: summa, requests: [request] };
        }
      });
      
      return aggregated;
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const aggregatedData = computed(() => aggregateData(props.requests));
    
    const computedChartData = computed(() => {
      const aggregated = aggregatedData.value;
      
      const labels = Object.keys(aggregated);
      const data = labels.map(label => aggregated[label].sum);
      const backgroundColor = labels.map(() => getRandomColor());
      
      return {
        labels,
        datasets: [
          {
            backgroundColor,
            data
          }
        ]
      };
    });

    const viewUser = (user) => {
      store.dispatch('updateUserData', user);
      router.push({ name: 'ViewUser', params: { id: user.id } });
    };

    return {
      aggregatedData,
      computedChartData,
      chartOptions,
      viewUser
    };
  }
});
</script>
<style scoped>
.fio-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif; /* Font family for the table */
}

.fio-table th, .fio-table td {
  border: 1px solid #333; /* Dark border */
  padding: 12px;
  text-align: left;
  cursor: pointer;
  background-color: #111; /* Dark background */
  color: #fff; /* White text */
}

.fio-table th {
  background-color: #333; /* Darker header background */
  font-weight: bold;
}

.fio-table td:hover {
  background-color: #555; /* Hover color */
}

.chart-container {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

/* Custom scrollbar */
.fio-table {
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #666 #111; /* Dark scrollbar with lighter track */
}

.fio-table::-webkit-scrollbar {
  width: 6px; /* Scrollbar width */
}

.fio-table::-webkit-scrollbar-track {
  background: #111; /* Track color */
}

.fio-table::-webkit-scrollbar-thumb {
  background-color: #666; /* Scrollbar thumb color */
  border-radius: 10px; /* Rounded corners */
}

</style>

