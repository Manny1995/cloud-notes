import sys

def repeated_squaring(base, power, divisor):
	cur = 1
	res = 0
	prev = pow(base, 1) % divisor
	while cur < power:
		#printf("%d is value, where current power is %d", prev, cur)	
		print ("The exponent is " + str(cur) + " and the value is " + str(prev))
		temp = pow(prev, 2) % divisor
		prev = temp
		cur = cur * 2


num = raw_input("Enter a number: ")
power = raw_input("Enter a power: ")
divisor = raw_input("Enter a divisor: ")

repeated_squaring(int(num), int(power), int(divisor))		
