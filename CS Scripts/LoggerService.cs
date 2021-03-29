using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public class LoggerService : MonoBehaviour
{
    public string APIBASE;
    private List<LogEntry> buffer;

    public void Log(LogEntry entry)
    {
        if (buffer == null)
            buffer = new List<LogEntry>();

        buffer.Add(entry);
    }
    public void SendAndFlush()
    {
        GenerateRequest();
        buffer = new List<LogEntry>();
    }

    private void GenerateRequest()
    {
        string API = APIBASE + ServerConfig.LOGSERVER_API_WRITESERVICE;
        Debug.Log("API Service: " + API);
        StartCoroutine(ProcessRequest(API));
    }

    private IEnumerator ProcessRequest(string uri)
    {
        string requestOut = "{\"buffer\" : [%array%] }";
        string requestEntries = "";
        
        if(buffer != null)
        {
             foreach(LogEntry entry in buffer)
            {
                requestEntries += "{\"level\":\"" + entry.level + "\", \"string\":\"" + entry.value + "\"},";
            }

            requestOut = requestOut.Replace("%array%", requestEntries);
            requestOut = requestOut.Replace(",]", "]");
            
        } else
        {
            Debug.LogError("Request buffer is null!!");
            yield return null;
        }
        Debug.Log("Request: " + requestOut);

        var request = new UnityWebRequest(uri, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(requestOut);
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();
        Debug.Log("Status Code: " + request.responseCode);
        Debug.Log("Response: " + request.downloadHandler.text);
    }

}
