# Android 權限問題

## [Android 網路安全配置](https://developer.android.com/training/articles/security-config?hl=zh-cn)

於config.xml檔案中，添加以下內容：
```
#android/app/scr/main/res/xml/config.xml

<edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
        <resource-file src="network_security_config.xml" target="app/src/main/res/xml/network_security_config.xml" />
    </edit-config>
    <preference name="android-targetSdkVersion" value="27" />
```


自行創建 network_security_config.xml ，並添加以下內容：
````
#android/app/scr/main/res/xml/network_security_config.xml

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
````



於AndroidManifest.xml檔案中，添加以下內容：
```
#android/app/scr/main/res/AndroidManifest.xml

<application android:networkSecurityConfig="@xml/network_security_config" android:hardwareAccelerated="true" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:supportsRtl="true" android:usesCleartextTraffic="true">
```

---