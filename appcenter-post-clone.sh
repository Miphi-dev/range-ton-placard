#!/usr/bin/env bash

echo "==============================================="
echo "SETTING google services FILES"
echo "==============================================="

if [ "$APPCENTER_XCODE_PROJECT" ]; then
  # Si c'est un projet iOS
  echo "Copie du contenu de GOOGLE_SERVICE dans GoogleService-Info.plist"
  echo "$GOOGLE_SERVICE" > "$APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info.plist"
else
  # Si c'est un projet Android
  echo "Copie du contenu de GOOGLE_SERVICE dans google-services.json"
  echo "$GOOGLE_SERVICE" > "$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json"
fi
