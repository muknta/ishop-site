from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import (
	ListView,
	DetailView,
	CreateView,
	UpdateView,
	DeleteView
)
from ishop.models import Phone, Comment
from ishop.forms import CommentForm



def index(request):
	return render(request, "ishop/index.html", {'title': 'Главная'})

def about(request):
	return render(request, "ishop/about.html", {'title': 'О нас'})

def contacts(request):
	return render(request, "ishop/contacts.html", {'title': 'Контакты'})

def jobs(request):
	return render(request, "ishop/jobs.html", {'title': 'Вакансии'})

def currency(request):
	return render(request, "ishop/currency.html", {'title': 'КУРС ВАЛЮТ'})

def phones(request):
	context = {
		'phones': Phone.objects.all()
	}
	return render(request, "ishop/phones.html", context, {'title': 'Смартфоны'})


class PhoneListView(ListView):
	model = Phone
	template_name = "ishop/phones.html"
	context_object_name = 'phones'
	ordering = ['phone_brand']
	paginate_by = 6


class UserCommentListView(ListView):
	model = Phone
	template_name = "ishop/user_comments.html"
	context_object_name = 'phones'
	ordering = ['phone_brand']
	paginate_by = 6

	def get_queryset(self):
		user = get_object_or_404(User, username=self.kwargs.get('username'))
		return Comment.objects.filter(author=user).order_by('-date_posted')


class PhoneDetailView(DetailView):
	model = Phone


class PhoneCreateView(LoginRequiredMixin, CreateView):
	model = Phone
	fields = ['phone_image','phone_brand','phone_model',
		'phone_price','phone_resolution','phone_camera','phone_diagonal']


def add_comment_to_phone(request, pk):
    phone = get_object_or_404(Phone, pk=pk)
    if request.method == "POST" and request.user.is_authenticated:
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.phone = phone
            comment.save()
            return redirect('ishop:phone-detail', pk=phone.pk)
    else:
        form = CommentForm(request.POST)
    return render(request, 'ishop/comment_form.html', {'form': form})


class PhoneUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
	model = Phone
	fields = ['phone_image','phone_brand','phone_model',
		'phone_price','phone_resolution','phone_camera','phone_diagonal']

	def test_func(self):
		if self.request.user.is_staff:
			return True
		return False


class PhoneDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
	model = Phone
	success_url = '/phones/'

	def test_func(self):
		if self.request.user.is_staff:
			return True
		return False

