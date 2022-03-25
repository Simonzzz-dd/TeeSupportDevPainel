import Cookies from 'js-cookie'

function SetCookies ( cookies_ ) {
    var duration = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
    Cookies.set( 'authenticated', cookies_.addProduts, {
        expires: duration
    });
    Cookies.set( 'generalManager', cookies_.generalManager, {
        expires: duration
    });
    Cookies.set( 'finances', cookies_.finances, {
        expires: duration
    });
    Cookies.set( 'createWebsite', cookies_.createWebsite, {
        expires: duration
    });
    Cookies.set( 'token', cookies_.token, {
        expires: duration
    });
}

function getClientSideToken ( ) {
    let Token = ""
    let c = Cookies.get()
    if ( c.token ) {
        Token = c.token
    }
    return Token
}

class ZimmoServerConnection {
    constructor (route, host) {
      this.route = route
      this.host = host
    }

    // All
    async AddWebsite ( websiteData ) {
        let { 
            website,
            expiresAt,
            mounthsPaid, 
            Paid, 
            Business,
            CompanyName,
            email,
            password,
            username,
            permissions
        } = websiteData
        const server = await fetch(`${this.host}/${this.route}/addWebSite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(
            { 
                website: website.toLocaleLowerCase(),
                expiresAt,
                mounthsPaid, 
                Paid, 
                Business,
                token: getClientSideToken(),
                CompanyName,
                email: email.toLocaleLowerCase(),
                password,
                username,
                permissions
            } 
          )
        })
        if ( server.status == 200 ) {
          const data = await server.json()
          if ( data.err?.cookies ) {
            SetCookies(data.err.cookies)
          }
          return data
        } else {
          return { err: 'something Went Wrong' }
        }
    }

    async EditWebsite ( websiteData ) {
        let { 
            website, Paid, expiresAt, mounthsPaid, MaxDataTransfer, maxProducts
        } = websiteData
        const server = await fetch(`${this.host}/${this.route}/editWebsiteData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(
            { 
                website, Paid, expiresAt, mounthsPaid, MaxDataTransfer, maxProducts, token: getClientSideToken(),
            } 
          )
        })
        if ( server.status == 200 ) {
          const data = await server.json()
          if ( data.err?.cookies ) {
            SetCookies(data.err.cookies)
          }
          return data
        } else {
          return { err: 'something Went Wrong' }
        }
    }


    async DeleteWebsite ( website ) {
      const server = await fetch(`${this.host}/${this.route}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(
          { website: website, token: getClientSideToken(), }
        )
      })
      if ( server.status == 200 ) {
        const data = await server.json()
        if ( data.err?.cookies ) {
            SetCookies(data.err.cookies)
        }
        return data
      } else {
        return { err: 'something Went Wrong' }
      }
    }
  
    async FetchUsers (  ) {
        const server = await fetch(`${this.host}/${this.route}/fetchUsers`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ token: getClientSideToken() })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
              }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async GetWebsites (  ) {
        const server = await fetch(`${this.host}/${this.route}/getWebsite`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ token: getClientSideToken() })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
            }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async isActive_ ( website, isActive ) {
        const server = await fetch(`${this.host}/${this.route}/isActive`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ website: website, isActive: isActive, token: getClientSideToken() })
        })
        if ( server.status == 200 ) {
            const data = server.json()
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async isProduction ( website, isProduction ) {
        const server = await fetch(`${this.host}/${this.route}/isProduction`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ website: website, isProduction: isProduction, token: getClientSideToken() })
        })
        if ( server.status == 200 ) {
            const data =await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
              }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async createDeveloper ( DeveloperData ) {
        const {
            email,
            password,
            username,
            permissions
        } = DeveloperData
        const server = await fetch(`${this.host}/${this.route}/createDeveloper`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                email,
                password,
                username,
                permissions,
                token: getClientSideToken()
            })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
            }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }
  
    
    async UpdateDeveloper ( DeveloperData ) {
        const {
            id,
            email,
            username,
            finances,
            generalManager,
            createWebsite
        } = DeveloperData
        const server = await fetch(`${this.host}/${this.route}/updateDeveloper`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                id,
                email,
                username,
                finances,
                generalManager,
                createWebsite,
                token: getClientSideToken()
            })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
            }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async deleteDev ( id ) {

        const server = await fetch(`${this.host}/${this.route}/deleteDeveloper`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                id, token: getClientSideToken()
            })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
            }
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async GetUserData (  ) {

        const server = await fetch(`${this.host}/${this.route}/getUserData`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ token: getClientSideToken() })
        })
        if ( server.status == 200 ) {
            const data = await server.json()
            if ( data.err?.cookies ) {
                SetCookies(data.err.cookies)
            }
            console.log(data)
            return data
        } else {
            return { err: 'something Went Wrong' }
        }
    }

    async Sign ( email, password ) {
        console.log(getClientSideToken())
        const server = await fetch(`${this.host}/${this.route}/sign`, {
            method: 'POST',
            mode: "cors",
            headers: {
            'Content-Type': 'application/json',
            },
            
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
                token: getClientSideToken()
            })
        })
        if ( server.status == 200 ) {
          const data = await server.json()
          if (data.sucess) SetCookies(data.sucess.cookies)
          if ( data.err ) SetCookies(data.err.cookies)
          return data
        } else {
          return { err: {msg:'something Went Wrong'}}
        }
    }
    async AuthState (  ) {
        const server = await fetch(`${this.host}/${this.route}/authstate`, {
            method: 'POST',
            mode: "cors",
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ token: getClientSideToken() })

        })
        if ( server.status == 200 ) {
          const data = server.json()
          return data
        } else {
          return { err: 'something Went Wrong' }
        }
    }
}



let Connection_ = new ZimmoServerConnection("developer","http://localhost:5000")


export default Connection_
