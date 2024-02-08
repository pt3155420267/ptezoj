#include <bits/stdc++.h>

using namespace std;

const int N = 1e3;

int main(){
	string tmp; while(getline(cin,tmp)){
		if(tmp[0] == 'T') break;
	}
	getline(cin,tmp); // \n
	string a,b,c; int d; string e,f,g,h;
	while(cin>>a>>b>>c>>d>>e>>f>>g>>h){
		a.erase(a.begin(),a.begin() + 7);
		a.erase(a.end() - 4,a.end());
		g.erase(g.begin(),g.begin() + 7);
		g.erase(g.end() - 4,g.end());
		cout<<a<<","<<g<<","<<d<<endl;
	}
	return 0;
}
