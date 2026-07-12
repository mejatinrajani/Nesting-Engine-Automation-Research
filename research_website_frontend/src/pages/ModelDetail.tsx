import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { GlassCard } from "@/components/GlassCard";
import { MetricBadge } from "@/components/MetricBadge";
import { Download, Clock, Layers } from "lucide-react";
import modelsData from "@/data/models.json";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ModelDetail = () => {
  const { id } = useParams();
  const model = modelsData.find((m) => m.id === id);

  if (!model) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-green-900">Model Not Found</h1>
        </div>
      </PageLayout>
    );
  }

  const trainingData = [
    { epoch: 0, loss: 2.5, accuracy: 45 },
    { epoch: 20, loss: 1.8, accuracy: 65 },
    { epoch: 40, loss: 1.2, accuracy: 78 },
    { epoch: 60, loss: 0.8, accuracy: 86 },
    { epoch: 80, loss: 0.5, accuracy: 92 },
    { epoch: 100, loss: 0.3, accuracy: model.accuracy },
  ];

  return (
    <PageLayout>
      <div className="bg-white border-b border-green-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-2">Model Details</p>
          <h1 className="text-4xl font-bold text-green-900 mb-2">{model.name}</h1>
          <p className="text-gray-500 text-sm">Strategy: {model.strategy}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricBadge label="Accuracy" value={`${model.accuracy}%`} color="green" />
          <MetricBadge label="Precision" value={model.precision} color="light" />
          <MetricBadge label="Recall" value={model.recall} color="mint" />
          <MetricBadge label="F1 Score" value={model.f1} color="green" />
          <MetricBadge label="AUC" value={model.auc} color="light" />
        </div>

        {/* Training Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard>
            <Layers className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Model Size</h4>
            <p className="text-2xl font-bold text-green-800">{model.size}</p>
          </GlassCard>

          <GlassCard>
            <Clock className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Training Time</h4>
            <p className="text-2xl font-bold text-green-800">{model.trainTime}</p>
          </GlassCard>

          <GlassCard>
            <Layers className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Epochs</h4>
            <p className="text-2xl font-bold text-green-800">{model.epochs}</p>
          </GlassCard>
        </div>

        {/* Training Charts */}
        <GlassCard>
          <h3 className="text-lg font-bold text-green-900 mb-6">Training Progress</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-4">Loss Curve</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="epoch" tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip contentStyle={{ fontSize: "12px", border: "1px solid #d1fae5", borderRadius: "4px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-4">Accuracy Curve</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="epoch" tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip contentStyle={{ fontSize: "12px", border: "1px solid #d1fae5", borderRadius: "4px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#4ade80" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        {/* Architecture */}
        <GlassCard>
          <h3 className="text-lg font-bold text-green-900 mb-4">Model Architecture</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
              <p className="font-mono text-sm text-gray-700">
                Input Layer → Convolutional Blocks → Dense Layers → Output (3 classes)
              </p>
            </div>
            <p className="text-sm text-gray-500">
              This model uses a {model.strategy.toLowerCase()} approach with optimized hyperparameters
              for the specific task. The architecture balances accuracy and computational efficiency.
            </p>
          </div>
        </GlassCard>

        {/* Downloads */}
        <GlassCard>
          <h3 className="text-lg font-bold text-green-900 mb-4">Download Model</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors hover-round-btn">
              <Download className="w-4 h-4" />
              <span>PyTorch (.pt)</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-green-700 text-white text-sm font-medium hover:bg-green-800 transition-colors hover-round-btn">
              <Download className="w-4 h-4" />
              <span>ONNX (.onnx)</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 border border-green-600 text-green-700 bg-white text-sm font-medium hover:bg-green-50 transition-colors hover-round-btn">
              <Download className="w-4 h-4" />
              <span>TensorFlow.js</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </PageLayout>
  );
};

export default ModelDetail;
