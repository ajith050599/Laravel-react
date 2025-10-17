<x-layouts.app :title="'Register'">
    <div
        x-data="registrationForm()"
        class="max-w-xl mx-auto bg-white shadow p-6 rounded-xl mt-6">
        <h2 class="text-2xl font-semibold mb-4">User Registration</h2>

        {{-- Text Inputs --}}
        <x-input label="Full Name" model="form.name" error="errors.name" />
        <x-input label="Email" type="email" model="form.email" error="errors.email" />
        <x-input label="Password" type="password" model="form.password" error="errors.password" />
        <x-input label="Confirm Password" type="password" model="form.confirmPassword" error="errors.confirmPassword" />
        <x-input label="Phone Number" type="text" model="form.phone" error="errors.phone" />

        {{-- Dropdowns --}}
        <x-select label="Gender" model="form.gender" options="['Male','Female','Other']" error="errors.gender" />
        <x-select label="Country" model="form.country" options="['India','USA','Canada','UK']" error="errors.country" />

        {{-- Textarea --}}
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">About</label>
            <textarea x-model="form.about" class="w-full border rounded p-2 focus:ring focus:ring-blue-300"></textarea>
        </div>

        {{-- Submit Button --}}
        <button
            @click="submitForm"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
        </button>

        <template x-if="submitted">
            <p class="mt-4 text-green-600 font-medium">Form submitted successfully!</p>
        </template>
    </div>

    {{-- Alpine component logic --}}
    <script>
        function registrationForm() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    gender: '',
                    country: '',
                    about: ''
                },
                errors: {},
                submitted: false,

                validate() {
                    this.errors = {};

                    if (!this.form.name.trim()) this.errors.name = 'Name is required.';
                    if (!this.form.email.includes('@')) this.errors.email = 'Enter a valid email.';
                    if (this.form.password.length < 6) this.errors.password = 'Min 6 characters.';
                    if (this.form.password !== this.form.confirmPassword) this.errors.confirmPassword = 'Passwords do not match.';
                    if (!this.form.phone.match(/^[0-9]{10}$/)) this.errors.phone = 'Enter 10-digit phone number.';
                    if (!this.form.gender) this.errors.gender = 'Select gender.';
                    if (!this.form.country) this.errors.country = 'Select country.';

                    return Object.keys(this.errors).length === 0;
                },

                submitForm() {
                    if (this.validate()) {
                        console.log("the form data", this.form);

                        this.submitted = true;
                        console.log('Form Data:', this.form);
                    } else {
                        this.submitted = false;
                    }
                }
            };
        }
    </script>
</x-layouts.app>