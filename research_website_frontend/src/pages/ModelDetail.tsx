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
          <h1 className="text-4xl font-bold text-gradient">Model Not Found</h1>
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
      <div className="bg-hero-gradient py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gradient mb-4 text-center">{model.name}</h1>
          <p className="text-xl text-center text-muted-foreground">Strategy: {model.strategy}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
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
            <Layers className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-bold mb-2">Model Size</h4>
            <p className="text-2xl font-bold text-gradient">{model.size}</p>
          </GlassCard>

          <GlassCard>
            <Clock className="w-10 h-10 text-secondary mb-3" />
            <h4 className="font-bold mb-2">Training Time</h4>
            <p className="text-2xl font-bold text-gradient">{model.trainTime}</p>
          </GlassCard>

          <GlassCard>
            <Layers className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-bold mb-2">Epochs</h4>
            <p className="text-2xl font-bold text-gradient">{model.epochs}</p>
          </GlassCard>
        </div>

        {/* Training Charts */}
        <GlassCard>
          <h3 className="text-2xl font-bold text-gradient mb-6">Training Progress</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Loss Curve</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="hsl(152, 69%, 61%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Accuracy Curve</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="hsl(152, 81%, 72%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        {/* Architecture */}
        <GlassCard>
          <h3 className="text-2xl font-bold text-gradient mb-4">Model Architecture</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-primary rounded">
              <p className="font-mono text-sm">
                Input Layer → Convolutional Blocks → Dense Layers → Output (3 classes)
              </p>
            </div>
            <p className="text-muted-foreground">
              This model uses a {model.strategy.toLowerCase()} approach with optimized hyperparameters
              for the specific task. The architecture balances accuracy and computational efficiency.
            </p>
          </div>
        </GlassCard>

        {/* Downloads */}
        <GlassCard>
          <h3 className="text-2xl font-bold text-gradient mb-4">Download Model</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:shadow-green transition">
              <Download className="w-5 h-5" />
              <span>PyTorch (.pt)</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg hover:shadow-green-soft transition">
              <Download className="w-5 h-5" />
              <span>ONNX (.onnx)</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
              <Download className="w-5 h-5" />
              <span>TensorFlow.js</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </PageLayout>
  );
};

export default ModelDetail;
