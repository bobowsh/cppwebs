/*******************************************************************************
* Project:  neb
* @file     CJson.cpp
* @brief 
* @author   bwarliao
* @date:    2014-7-16
* @note
* Modify history:
******************************************************************************/

#include "Json.h"
#include <iostream>

#define INIT_FLAG 0xEB90

#if defined(_MSC_VER) && (_MSC_VER < 1700)
#define snprintf _snprintf
#define vsnprintf _vsnprintf
#endif

CJson::CJson()
: m_pRootData(NULL),  m_pDataPointer(NULL),m_nInitFlag(INIT_FLAG)
{
	//CheckRoot();
}

CJson::CJson(const std::string& strJson)
: m_pRootData(NULL),  m_pDataPointer(NULL),m_nInitFlag(INIT_FLAG)
{
	Parse(strJson);
}

CJson::CJson(CJson& rObj)
{
	*this = rObj;
}

CJson::~CJson()
{
	Clear();
}

CJson& CJson::operator=(CJson& rObj)
{
	if(this != &rObj)
	{		
		cJSON* pJson = cJSON_Duplicate(rObj.m_pDataPointer,1);

		if(m_pRootData == NULL || m_nInitFlag != INIT_FLAG)//未执行构造函数，指针为非法
		{
			m_pRootData = pJson;
			m_pDataPointer = m_pRootData;
		}
		else
		{	
			if(m_pDataPointer == NULL)
				m_pDataPointer = m_pRootData;

			cJSON_SetObjectValue(m_pDataPointer, pJson);
		}
		m_pDataPointer = m_pRootData;
	}

	return(*this);
}


CJson& CJson::operator[](const char* strKey)
{
	CheckRoot();

	cJSON* pJsonStruct = NULL;
	if (m_pDataPointer == NULL)
		m_pDataPointer = m_pRootData;

	if (m_pRootData != NULL)
	{
		pJsonStruct = cJSON_GetObjectItem(m_pRootData, strKey);
	}

	if(pJsonStruct == NULL)
	{
		//默认创建一个对象
		pJsonStruct = cJSON_CreateNull();
		cJSON_AddItemToObject(m_pRootData, strKey, pJsonStruct);

	}	
	m_pDataPointer = pJsonStruct;

	return *this;
}

CJson& CJson::operator[](int nIndex)
{
	CheckRootArray();
	cJSON* pJsonStruct = NULL;
	if (m_pDataPointer != NULL)
	{
		if (m_pDataPointer->type == cJSON_Array)
		{
			pJsonStruct = cJSON_GetArrayItem(m_pDataPointer, nIndex);
		}
	}

	if(pJsonStruct == NULL)
	{
		//默认创建一个对象
		pJsonStruct = cJSON_CreateNull();
		cJSON_AddItemToArray(m_pDataPointer, pJsonStruct);
	}	

	m_pDataPointer = pJsonStruct;
	return *this;
}

bool CJson::append(int nVal)
{
	CheckRootArray();
	if(m_pDataPointer == NULL)
		return false;
	m_pDataPointer->type = cJSON_Array;
	cJSON* pObj = cJSON_CreateInt(nVal,nVal>0?1:-1);

	cJSON_AddItemToArray(m_pDataPointer, pObj);
	m_pDataPointer = m_pRootData;
	return pObj!=NULL;
}

bool CJson::append(double nVal)
{
	CheckRootArray();
	if(m_pDataPointer == NULL)
		return false;
	m_pDataPointer->type = cJSON_Array;
	cJSON* pObj = cJSON_CreateDouble(nVal,nVal>0?1:-1);

	cJSON_AddItemToArray(m_pDataPointer, pObj);
	m_pDataPointer = m_pRootData;
	return pObj!=NULL;
}

bool CJson::append(bool bVal)
{
	CheckRootArray();
	if(m_pDataPointer == NULL)
		return false;
	m_pDataPointer->type = cJSON_Array;
	cJSON* pObj = cJSON_CreateBool(bVal);

	cJSON_AddItemToArray(m_pDataPointer, pObj);
	m_pDataPointer = m_pRootData;
	return pObj!=NULL;
}

bool CJson::append(std::string strVal)
{
	CheckRootArray();
	if(m_pDataPointer == NULL)
		return false;
	m_pDataPointer->type = cJSON_Array;
	cJSON* pObj = cJSON_CreateString(strVal.c_str());

	cJSON_AddItemToArray(m_pDataPointer, pObj);
	m_pDataPointer = m_pRootData;
	return pObj!=NULL;
}

std::string CJson::asString()
{
	if (m_pDataPointer == NULL)
	{
		return "";
	}
	if (m_pDataPointer->type != cJSON_String)
	{
		return "";
	}
	cJSON* pJsonStruct = m_pDataPointer;

	m_pDataPointer = m_pRootData;

	return pJsonStruct->valuestring;
}

int CJson::asInt()
{
	if (m_pDataPointer == NULL)
	{
		return 0;
	}
	if (m_pDataPointer->type != cJSON_Int)
	{
		return 0;
	}
	cJSON* pJsonStruct = m_pDataPointer;

	m_pDataPointer = m_pRootData;

	return pJsonStruct->valueint;
}

double CJson::asDouble()
{
	if (m_pDataPointer == NULL)
	{
		return 0;
	}
	if (m_pDataPointer->type != cJSON_Double)
	{
		return 0;
	}
	cJSON* pJsonStruct = m_pDataPointer;
	m_pDataPointer = m_pRootData;

	return pJsonStruct->valuedouble;
}

bool CJson::asBool()
{
	if (m_pDataPointer == NULL)
	{
		return 0;
	}
	if (m_pDataPointer->type > cJSON_True)
	{
		return false;
	}
	cJSON* pJsonStruct = m_pDataPointer;
	m_pDataPointer = m_pRootData;
	return pJsonStruct->type==1?true:false;
}

bool CJson::Parse(const std::string& strJson)
{
	Clear();
	m_pRootData = cJSON_Parse(strJson.c_str());

	m_pDataPointer = m_pRootData;

	if (m_pRootData == NULL)
	{
		m_strErrMsg = std::string("prase json string error at ") + cJSON_GetErrorPtr();
		return(false);
	}

	return(true);
}

void CJson::Clear()
{
	if (m_pRootData != NULL)
	{
		cJSON_Delete(m_pRootData);
		m_pRootData = NULL;
		m_pDataPointer = NULL;
	}
}

bool CJson::isNull() const
{
	if (m_pDataPointer == NULL)
	{
		return true;
	}

	if(m_pDataPointer->type == cJSON_NULL)
		return true;

	return false;
}

bool CJson::isBool() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_True || 
		m_pDataPointer->type == cJSON_False)
		return true;

	return false;
}

bool CJson::isInt() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_Int)
		return true;

	return false;
}

bool CJson::isDouble() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_Double)
		return true;

	return false;
}

bool CJson::isString() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_String)
		return true;

	return false;
}

bool CJson::isArray() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_Array)
		return true;

	return false;
}

bool CJson::isObject() const
{
	if (m_pDataPointer == NULL)
	{
		return false;
	}

	if(m_pDataPointer->type == cJSON_Object)
		return true;

	return false;
}

std::string CJson::toString() const
{
	char* pJsonString = NULL;
	std::string strJsonData = "";
	if (m_pRootData != NULL)
	{
		pJsonString = cJSON_PrintUnformatted(m_pRootData);
	}
	if (pJsonString != NULL)
	{
		strJsonData = pJsonString;
		free(pJsonString);
	}
	return(strJsonData);
}

std::string CJson::toStyledString() const
{
	char* pJsonString = NULL;
	std::string strJsonData = "";
	if (m_pRootData != NULL)
	{
		pJsonString = cJSON_Print(m_pRootData);
	}

	if (pJsonString != NULL)
	{
		strJsonData = pJsonString;
		free(pJsonString);
	}
	return(strJsonData);
}


int CJson::size()
{
	return cJSON_GetArraySize(m_pDataPointer);
}

const std::string& CJson::getError() const
{
	return(m_strErrMsg);
}

void CJson::CheckRoot()
{
	if (m_pRootData == NULL)
	{
		m_pRootData = cJSON_CreateObject();
		m_pDataPointer = m_pRootData;
	}
}

void CJson::CheckRootArray()
{
	if (m_pRootData == NULL)
	{
		m_pRootData = cJSON_CreateArray();
		m_pDataPointer = m_pRootData;
	}

	if (m_pDataPointer->type != cJSON_Array)
	{
		m_pDataPointer->type = cJSON_Array;
	}
}

bool CJson::isMember(const std::string& strKey)
{
	cJSON* pJsonStruct = NULL;
	if (m_pDataPointer != NULL)
	{
		pJsonStruct = cJSON_GetObjectItem(m_pDataPointer, strKey.c_str());
	}
	if (pJsonStruct == NULL)
	{
		return(false);
	}
	return(true);
}

CJson& CJson::operator=(const char* strValue)
{
	cJSON_SetValuestring(m_pDataPointer, strValue);
	m_pDataPointer = m_pRootData;
	return *this;
}


CJson& CJson::operator=(int nVal)
{
	cJSON_SetIntValue(m_pDataPointer, nVal);
	m_pDataPointer = m_pRootData;
	return *this;
}

CJson& CJson::operator=(double nVal)
{
	cJSON_SetDoubleValue(m_pDataPointer, nVal);
	m_pDataPointer = m_pRootData;
	return *this;
}

CJson& CJson::operator=(bool bVal)
{
	cJSON_SetBoolValue(m_pDataPointer, bVal);
	m_pDataPointer = m_pRootData;
	return *this;
}

void testjson()
{
	std::string strjson;	
	{
		//简单写
		CJson root, fruit, mail;


		root["Name"] = "wangshuai";
		root["Age"] = 25;
		root["gender"] = "man";
		root["money"] = 3000.1;
		root["task"] = true;

		fruit[0] = "apple";
		fruit[1] = "orange";
		fruit[2] = "banana";
		fruit[3] = 123;
		root["fruit"] = fruit;

		mail["QQ"] = "XXX@qq.com";
		mail["gmail"] = "XXX@gmail.com";

		std::cout << mail.toStyledString() << std::endl;



		root["mail"] = mail;

		std::cout << root.toStyledString() << std::endl;
		root["fruit"][0] = "strawberry";
		strjson = root.toString();
		std::cout << root.toString()<< std::endl;
	}
	{
		CJson root, fruit, mail;

		root.Parse(strjson);
		int iage = 0;
		std::string sname;

		iage = root["Age"].asInt();
		sname = root["Name"].asString();
		fruit = root["fruit"];
		mail = root["mail"];

		std::cout << "age: " << iage << std::endl;
		std::cout << "name: " << sname << std::endl;
		std::cout << "fruit: " << fruit[0].asString() <<" "<< fruit[1].asString()<<" " << fruit[2].asString() << std::endl;
		std::cout << "mailqq: " << mail["QQ"].asString() << std::endl;
	}

	{
		std::string strValue = "{\"key1\":\"value1\",\"array\":[{\"key2\":\"value2\"},{\"key2\":\"value3\"},{\"key2\":\"value4\"}]}";

		CJson root(strValue);

		strjson = root.toStyledString();

		std::cout <<"key1: "<< root["key1"].asString() << std::endl;

		CJson arrayObj = root["array"];
		int nSize = arrayObj.size();
		for (int i=0; i<nSize; i++)
		{
			std::cout << arrayObj[i]["key2"].asString();
			if (i != nSize - 1 )
				  std::cout << std::endl;
		}
	}


	getchar();
}
