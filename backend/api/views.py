from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics

from .models import Todo
from .serializers import TodoSerializer
import random 
import pandas as pd



from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from knox.models import AuthToken
from rest_framework.authtoken.models import Token


from .serializers import  CreateUserSerializer, UserSerializer,LoginUserSerializer


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


        


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.get_or_create(user)[0].key #AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        print(dir(Token.objects.get_or_create(user)[0]))
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.get_or_create(user)[0].key#AuthToken.objects.create(user)[1]
        })




class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

@csrf_exempt
def stock_price(request):
	window = -50 #number of data points
	data = pd.read_csv('~/Desktop/desktop/Anurag/others/prashant/data.csv')
	temp = data.iloc[window:]
	return JsonResponse(temp.to_dict(),safe=False)
	#return JsonResponse([{'id':1,'title':'First'},{"id":2,'title':"Second"},{'id':3,'title':'third'}] ,safe=False)


def stock_price1(request):
    if request.method!="POST":
        return JsonResponse({'data':'Erro 404'})
    print(request.body)
    window = -50 #number of data points
    data = pd.read_csv('~/Desktop/desktop/Anurag/others/prashant/data.csv')
    temp = data.iloc[window:]
    return JsonResponse(temp.to_dict(),safe=False)
    #return JsonResponse([{'id':1,'title':'First'},{"id":2,'title':"Second"},{'id':3,'title':'third'}] ,safe=False)

from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class PriceALL(generics.GenericAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    permission_classes = [IsAuthenticated, ]

    def get(self,request):
        window = -50 #number of data points
        data = pd.read_csv('~/Desktop/desktop/Anurag/others/prashant/data.csv')
        temp = data.iloc[window:].set_index('time')
        return JsonResponse(temp.to_dict(),safe=False)




@csrf_exempt
def check(request):
    print(request.body)
    return JsonResponse({"check":'ok'})