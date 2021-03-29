Express Logger Service
==================================

Ignore the ServerConfig.LOGSERVER_API_BASE
You must attach the LoggerService.cs to any object in the scene.



Calling the LogService
---------------
Add the property "APIBASE", usually:
http://127.0.0.1:8080/api
if you debug the project on your machine.
Otherwhise:
##How to obtain the ip address of the machine in which the LogServer is running:
From your terminal
------
```sh
flavio@MacBook-Pro-di-Flavio-2 ~ %  ifconfig en0
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	options=400<CHANNEL_IO>
	ether 3c:22:fb:e9:01:73 
	inet6 fe80::815:8ec0:522d:520a%en0 prefixlen 64 secured scopeid 0x6 
	inet 192.168.1.238 netmask 0xffffff00 broadcast 192.168.1.255
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect
	status: active


>> 192.168.1.238  this is your ip.

APIBASE=http://192.168.1.238:8080/api (you need to check every time you change network/login/logoff)


```

