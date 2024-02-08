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
		int pos;
		a.erase(a.begin(),a.begin()+7);
		for(pos = a.size();a[pos] != '_';pos--);
		a.erase(a.begin() + pos,a.end());
		g.erase(g.begin(),g.begin()+7);
		for(pos = g.size();g[pos] != '_';pos--);
		g.erase(g.begin() + pos,g.end());
		cout<<a<<","<<g<<","<<d<<endl;
	}
	return 0;
}
