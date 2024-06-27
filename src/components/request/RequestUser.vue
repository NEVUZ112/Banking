<template>
  <div>
    <h2>Statuslar</h2>
    <table class="user-table" v-if="userData">
      <thead>
        <tr>
          <th>Status</th>
          <th>Summa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in userData.requests" :key="request.id" :class="getStatusClass(request.status)">
          <td>{{ request.status }}</td>
          <td>{{ request.Summa }}</td>
        </tr>
      </tbody>
    </table>
    <div class="chart-container">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'RequestUser',
  setup() {
    const store = useStore();
    const userData = computed(() => store.getters.userData);

    const getStatusClass = (status) => {
      switch (status) {
        case 'active':
          return 'status-active';
        case 'done':
          return 'status-done';
        case 'sending':
          return 'status-sending';
        case 'cancelled':
          return 'status-cancelled';
        default:
          return '';
      }
    };

    onMounted(() => {
      const requests = userData.value.requests;
      const statusLabels = requests.map(request => request.status);
      const statusSums = requests.map(request => Number(request.Summa));

      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: statusLabels,
          datasets: [{
            label: 'Summa by Status',
            data: statusSums,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    return {
      userData,
      getStatusClass
    };
  }
});
</script>

<style>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

/* Status-based row styles */
.status-active {
  background-color: #00ff3c; /* Green */
}
.status-done {
  background-color: #0026ff; /* Green */
  color: #fff;
}
.status-sending {
  background-color: #ff0015; /* Red */
  color: #fff;
}
.status-cancelled {
  background-color: #ffc400; /* Yellow */
}

.chart-container {
  width: 100%;
  margin-top: 20px;
}
</style>
