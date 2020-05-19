1) npm install

2)go to
    node_modules --> react-native-permission --> RNPermissions.m
    then delete below block
        #if RCT_DEV
        if ([available count] == 0) {
            NSMutableString *message = [NSMutableString new];

            [message appendString:@"⚠  No permission handler detected.\n\n"];
            [message appendString:@"• Check that you link at least one permission handler in your Podfile.\n"];
            [message appendString:@"• Uninstall this app, delete your Xcode DerivedData folder and rebuild it.\n"];
            [message appendString:@"• If you use `use_frameworks!`, follow the workaround guide in the project README."];

            RCTLogError(@"%@", message);
        }
        #endif


3)to generate apk 
 
this need only first time :  

You can add code in node_modules/react-native/react.gradle. 
After doFirst
doLast {
def moveFunc = { resSuffix ->
File originalDir = file("$buildDir/generated/res/react/release/${resSuffix}");
if (originalDir.exists()) {
File destDir = file("$buildDir/../src/main/res/${resSuffix}");
ant.move(file: originalDir, tofile: destDir);
}
}
moveFunc.curry("drawable-ldpi").call()
moveFunc.curry("drawable-mdpi").call()
moveFunc.curry("drawable-hdpi").call()
moveFunc.curry("drawable-xhdpi").call()
moveFunc.curry("drawable-xxhdpi").call()
moveFunc.curry("drawable-xxxhdpi").call()
moveFunc.curry("raw").call()
}



