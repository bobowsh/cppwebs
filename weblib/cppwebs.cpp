#include "cppwebs.h"


static void EvHandler(struct mg_connection* nc, int ev, void* ev_data, void* userdata)
{
	CppWebs* pCppWebs = (CppWebs*)userdata;
	if(pCppWebs == NULL)
		return;
	switch(ev)
	{
	case MG_EV_HTTP_REQUEST:

		if(false == pCppWebs->HandleRequst(nc, ev, ev_data))
			

		break;
	default:
		break;
	}
}


CppWebs::CppWebs(void)
{
	m_pCurConn = NULL;
	memset(&m_s_http_server_opts, 0, sizeof(m_s_http_server_opts));
}

CppWebs::~CppWebs(void)
{
  mg_mgr_free(&_mgr);
}

bool CppWebs::Start(std::string strRoot, unsigned short port)
{
	memset(_port, 0, sizeof(_port));
	snprintf(_port, sizeof(_port), "%u", port);
	mg_mgr_init(&_mgr, NULL);
	m_pCurConn = mg_bind(&_mgr, _port, MG_CB(EvHandler, this));

	if(NULL == m_pCurConn)
	{
		fprintf(stderr, "Cannot bind to %s\n", _port);
		return false;
	}

	mg_set_protocol_http_websocket(m_pCurConn);

	cs_stat_t st;
	m_strRoot = strRoot;
	m_s_http_server_opts.document_root = m_strRoot.c_str();  // Set up web root directory

	if (mg_stat(m_s_http_server_opts.document_root, &st) != 0) {
		fprintf(stderr, "%s", "Cannot find web_root directory, exiting\n");
		return false;
	}
	printf("Starting web server on port %s\n", _port);
	return true;
}

bool CppWebs::Close()
{
	mg_mgr_free(&_mgr);
	return true;
}

bool CppWebs::RegisterHandler(std::string uri)
{
	m_mapApi[uri] = true;
	return true;
}

void CppWebs::EventPoll(int milli)
{
	mg_mgr_poll(&_mgr, milli);
}


bool CppWebs::HandleRequst(struct mg_connection* nc,int ev, void* ev_data)
{
	m_pCurConn = nc;
	http_message* hm = (http_message*)ev_data;
	std::string uri(hm->uri.p, hm->uri.len);

	if(m_mapApi.end() == m_mapApi.find(uri))
	{
		mg_serve_http(m_pCurConn, hm, m_s_http_server_opts); /* Serve static content */
		return false;
	}
	
	CJson jsonobj(std::string(hm->body.p, hm->body.len));

	if(jsonobj.isNull())
	{
		printf("%s: %s\n", jsonobj.getError().c_str(), jsonobj.toString().c_str());
		return false;
	}

	return OnProcApi(uri, jsonobj);
}/*
{
# 是否响应成功
success: true,
# 响应状态码
code: 200,		
# 响应数据
data: Object
# 返回错误信息
message: "",
}
*/


void CppWebs::SendReply( bool bSuccuss, int nCode, CJson& jsonObj, std::string strMsg)
{
	/* Send headers */
	mg_printf(m_pCurConn, "%s", "HTTP/1.1 200 OK\r\nContent-Type:application/json;charset=gbk\r\nTransfer-Encoding: chunked\r\n\r\n");

	mg_printf_http_chunk(m_pCurConn, "{ \"success\": %s,\n \"code\": %d, \n \"data\": %s,\n \"msg\": \"%s\"}", bSuccuss?"true":"false",nCode, jsonObj.toString().c_str(), strMsg.c_str());
	mg_send_http_chunk(m_pCurConn, "", 0); /* Send empty chunk, the end of response */	
}

void CppWebs::SendError(int errcode, std::string reply)
{
	mg_printf(m_pCurConn, "HTTP/1.1 %d %s\r\n", errcode, reply.c_str());
	m_pCurConn->flags |= MG_F_SEND_AND_CLOSE;
}

