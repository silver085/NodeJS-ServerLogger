using System;
public struct LogEntry
{
    public string level;
    public string value;

    public LogEntry(string level, string value)
    {
        this.level = level;
        this.value = value;
    }
}
