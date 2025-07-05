import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type NeoData } from '../services/api';

interface NEOChartProps {
  neos: NeoData[];
}

const NEOChart = ({ neos }: NEOChartProps) => {
  // Prepare data for the chart
  const chartData = neos.slice(0, 10).map(neo => ({
    name: neo.name.replace(/[()]/g, '').slice(0, 15),
    diameter: Math.round((neo.estimated_diameter.meters.estimated_diameter_min + 
                         neo.estimated_diameter.meters.estimated_diameter_max) / 2),
    velocity: Math.round(Number(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour || 0)),
    distance: Math.round(Number(neo.close_approach_data[0]?.miss_distance.kilometers || 0) / 1000), // in thousands km
    hazardous: neo.is_potentially_hazardous_asteroid,
  }));

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Top 10 NEOs by Size</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #6B7280',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#E5E7EB' }}
          />
          <Legend />
          <Bar 
            dataKey="diameter" 
            fill="#8B5CF6" 
            name="Diameter (m)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-gray-400">Total NEOs</div>
          <div className="text-2xl font-bold text-white">{neos.length}</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-gray-400">Hazardous</div>
          <div className="text-2xl font-bold text-red-400">
            {neos.filter(n => n.is_potentially_hazardous_asteroid).length}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-gray-400">Average Velocity</div>
          <div className="text-2xl font-bold text-blue-400">
            {Math.round(
              neos.reduce((sum, neo) => 
                sum + Number(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour || 0), 0
              ) / neos.length
            ).toLocaleString()} km/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default NEOChart;