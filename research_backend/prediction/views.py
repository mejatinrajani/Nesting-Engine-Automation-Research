from rest_framework.decorators import api_view
from rest_framework.response import Response
from .engine import predict

@api_view(['POST'])
def predict_algorithm(request):
    data = request.data
    
    # Extract data from React payload
    shapes = data.get('shapes', {})
    priorities = data.get('priorities', {})
    
    try:
        result = predict(shapes, priorities)
        
        # Add a dynamic explanation based on result
        algo = result['algorithm']
        explanation = ""
        if algo == 'nfp_based': explanation = "Detected flat or irregular shapes. NFP is optimal for geometry-aware nesting."
        elif algo == 'first_fit_decreasing': explanation = "High priority on Speed detected. FFD is the fastest solver."
        elif algo == 'genetic': explanation = "High efficiency required for complex 3D shapes. Genetic algorithms optimize density best."
        elif algo == 'layer_decomposer': explanation = "Balanced choice for standard mixed production runs."
        else: explanation = "Selected based on optimal balance of your priorities."
        
        result['explanation'] = explanation
        return Response(result)
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)