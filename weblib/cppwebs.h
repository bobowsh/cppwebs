#ifndef _CPPWEBS_
#define _CPPWEBS_

#include <string>
#include <map>
#include "Json.h"

#ifdef __cplusplus
extern "C" {
#endif
#include "mongoose.h"
#ifdef __cplusplus
}
#endif

class CppWebs
{
public:
	CppWebs(void);
	virtual ~CppWebs(void);

	virtual bool OnProcApi(std::string& strApi, CJson& jsonObj) = 0;

	
	bool Start(std::string strRoot="./", unsigned short port=8000);
	bool Close();
	bool RegisterHandler(std::string uri);

	void EventPoll(int milli);

	void SendReply(bool bSuccuss, int nCode, CJson& jsonObj, std::string strMsg="");
	void SendError( int errcode, std::string reply);


	bool HandleRequst(struct mg_connection* nc,int ev, void *ev_data);
protected:
	std::map<std::string,bool> m_mapApi;
	struct mg_connection* m_pCurConn;
	struct mg_serve_http_opts m_s_http_server_opts;

	std::string m_strRoot;

	char _port[11];
	struct mg_mgr _mgr;
};


#endif