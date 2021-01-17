// Copyright (c) 2015 Cesanta Software Limited
// All rights reserved

#include "../weblib/cppwebs.h"

#define  LOGIN_API "/api/login"

class CTxbZhzMgr:public CppWebs
{
public:
	CTxbZhzMgr()
	{
		RegisterHandler(LOGIN_API);
	}
	virtual bool OnProcApi(std::string& strApi, CJson& jsonObj)
	{
		if(strApi == LOGIN_API)
		{
			std::string username = jsonObj["username"].asString();
			std::string passwd = jsonObj["password"].asString();

			if(passwd == "123456" && username == "admin")
				this->SendReply(true, 100, jsonObj);
			else
				this->SendReply(false, 100, jsonObj, "ÓÃ»§ÃÜÂë´íÎó");
		}

		return true;
	}
};


int main(void) 
{
  testjson();
  CTxbZhzMgr txbweb;
  if(txbweb.Start("../../comsysmng") == false)
  {
	   fprintf(stderr, "Cannot start webs\n");
	  return -1;
  }
  

  for (;;) 
  {
    txbweb.EventPoll(1000);
  }


  return 0;
}
