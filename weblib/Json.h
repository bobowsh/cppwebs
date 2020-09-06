/*******************************************************************************
 * Project:  neb
 * @file     CJsonObject.hpp
 * @brief    Json
 * @author   bwarliao
 * @date:    2014-7-16
 * @note
 * Modify history:
 ******************************************************************************/

#ifndef CJSONOBJECT_HPP_
#define CJSONOBJECT_HPP_


#include "cJSON.h"

#include <stdio.h>
#include <stddef.h>
#include <malloc.h>
#include <errno.h>
#include <math.h>
#include <string>




class CJson
{
public:     // method of ordinary json object or json array
    CJson();
    CJson(const std::string& strJson);
    CJson( CJson& oJsonObject);
    virtual ~CJson();

    CJson& operator=(CJson& oJsonObject);
	CJson& operator[](const char* strKey);
	CJson& operator[](int nIndex);
	CJson& operator=(int nVal);
	CJson& operator=(double nVal);
	CJson& operator=(bool bVal);
	CJson& operator=(const char* strVal);

	bool Parse(const std::string& strJson);
    void Clear();

	bool isNull() const;
	bool isBool() const;
	bool isInt() const;
	bool isDouble() const;
	bool isString() const;
	bool isArray() const;
	bool isObject() const;

	bool isMember(const std::string& strKey);

    std::string toString() const;
    std::string toStyledString() const;

	int  size();
	bool append(int nVal);
	bool append(double nVal);
	bool append(bool bVal);
	bool append(std::string strVal);

	std::string asString();
	int asInt();
	double asDouble();
	bool asBool();

    const std::string& getError() const;
protected:
	void CheckRoot();
 
	void CheckRootArray();
protected:
    cJSON* m_pRootData;
	cJSON* m_pDataPointer;
    std::string m_strErrMsg;
	uint32 m_nInitFlag;
};

void testjson();


#endif /* CJSONHELPER_HPP_ */
