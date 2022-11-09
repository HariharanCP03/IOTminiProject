# Commented out IPython magic to ensure Python compatibility.

print("before importing")

import pandas as pd 
import warnings
warnings.filterwarnings("ignore")
import pickle

print("after importing")

data = pd.read_csv("Crop_recommendation.csv")

X = data.iloc[:,:-1]
y = data.iloc[:,-1]

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.33,
                                               shuffle=True,random_state=0)

print("after splitting")
# random forest 
from sklearn.ensemble import RandomForestClassifier
classifier_rf=RandomForestClassifier(n_estimators=10,criterion="entropy")
classifier_rf.fit(X_train,y_train)

print("after fitting")
pickle.dump(classifier_rf, open('model.pkl', 'wb'))

pickled_model = pickle.load(open('model.pkl', 'rb'))
y_pred=pickled_model.predict(X_test)

print("after predicting")

from sklearn.metrics import accuracy_score
accuracy=accuracy_score(y_pred, y_test)
print('Random Forest Model accuracy score: {0:0.4f}'.format(accuracy_score(y_test, y_pred)))

from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))

