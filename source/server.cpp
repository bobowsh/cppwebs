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
			std::string username;
			jsonObj["username"].Get("username", username);
		}

		return true;
	}
};


int main(void) 
{

  CTxbZhzMgr txbweb;
  if(txbweb.Start("../../vuehello") == false)
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
