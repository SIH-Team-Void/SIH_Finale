from rest_framework import serializers
from .models import Vendors
from .models import Inventory
from .models import Sales
from .models import SalesItem



#to convert into real time data
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendors
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = "__all__"

class SalesItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesItem
        fields = "__all__"

    def validate(self, data):
        # Check inventory availability
        inventory = data["inventory"]
        if inventory.Inv_quantity < data["quantity"]:
            raise serializers.ValidationError("Not enough inventory available.")
        return data
