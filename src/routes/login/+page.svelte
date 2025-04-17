<script lang="ts">
	import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation'
 
  let formView: "email" | "otp" = $state("email");
  let email = $state("");
  let otp = $state("");
  let errorMessage = $state("");

  async function sendOtp(event: SubmitEvent){
    event.preventDefault();
    const { data , error} = await authClient.emailOtp.sendVerificationOtp({
      email : email ,
      type : "sign-in"  
    });
    if(data?.success){
      formView = "otp";
    } else {
      errorMessage = error?.message || 'une erreur inconnue est apparue'
    }
  }

  async function verifyOtp(event : SubmitEvent){
    event.preventDefault();
    const {data,error} = await authClient.signIn.emailOtp({
      email: email,
      otp : otp,
      });
    if(data?.user){
      goto("/", {invalidateAll: true})
    }else{
      errorMessage = error?.message || "Une errur inconnue est apparue"
    }
  }

	async function logingWithGoogle() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/',
			newUserCallbackURL: '/'
		});
	}
</script>
{#if formView === "email"}
  <form onsubmit={sendOtp} class="flex flex-col max-w-md gap-2 m-12 ">
    <label for="label"> Email </label>
    <input type="email" bind:value={email} name="email"/>
    <button class="bg-blue-400 px-4 py-2 rounded text-white hover:bg-blue-200 cursor-pointer" type="submit">
        Send Me a login code
    </button>
  </form>
  {:else if formView === "otp"}
  <form onsubmit={verifyOtp}>
    <label for="otp">Donnez le code svp </label>
    <input type="text" bind:value={otp} name="otp" required/>
    code : "{otp}"
    <button class="bg-blue-400 hover:bg-blue-200 px-4 py-2 rounded cursor-pointer" type="submit">Login</button>
    <button onclick={()=> formView ="email"}>annuler</button>

  </form>
{/if}
{#if errorMessage}
    <p>{errorMessage}</p>
{/if}
<div class="flex min-h-screen flex-col items-center justify-center gap-12">
	<h1>Login</h1>
	<button class="rounded bg-neutral-100 p-2" onclick={logingWithGoogle}>Login with Google</button>
</div>
