//
//  CategoryTableViewController.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/1/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "CategoryTableViewController.h"

@interface CategoryTableViewController ()

@property(copy, nonatomic) NSMutableArray<CategoryModel *> *dataSource;
@property(copy, nonatomic) NSArray<CategoryModel *> *filteredDataSource;

@property(copy, nonatomic) NSString *selectedCategoryId;

@end

@implementation CategoryTableViewController

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:YES];
    [self.navigationItem.searchController dismissViewControllerAnimated:NO completion:nil];
}
-(void) viewWillAppear:(BOOL)animated {
    [super viewWillAppear:YES];
    self.navigationController.navigationBar.prefersLargeTitles = YES;
    
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
    
    self.tableView.estimatedRowHeight = 75.0;
    self.tableView.rowHeight = UITableViewAutomaticDimension;
    
    self.dataSource = [NSMutableArray new];
    self.filteredDataSource = [NSArray new];
    
    [self setupSearchAndNavbar];
    
    __weak CategoryTableViewController *weakSelf = self;
    [NoteService getCategories:^(NSMutableArray * data) {
        weakSelf.dataSource = data;
        weakSelf.filteredDataSource = data;
        [self.tableView reloadData];
    }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void) setupSearchAndNavbar {
    self.navigationItem.searchController = [[UISearchController alloc] initWithSearchResultsController:nil];
    self.navigationItem.searchController.searchBar.delegate = self;
    self.navigationItem.hidesBackButton = NO;
    [self.navigationItem.searchController setActive:YES];
    self.navigationController.navigationBar.prefersLargeTitles = YES;
    self.navigationItem.searchController.searchResultsUpdater = self;
    self.navigationItem.searchController.dimsBackgroundDuringPresentation = NO;
}


#pragma mark - Search Delegate


- (void)updateSearchResultsForSearchController:(UISearchController *)searchController {
    NSString *searchText = searchController.searchBar.text;
    
    if (![searchText isEqualToString:@""]) {
        self.filteredDataSource = [self.dataSource filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject, NSDictionary<NSString *,id> * _Nullable bindings) {
            CategoryModel *model = evaluatedObject;
            return [model.title containsString:searchText];
        }]];
    }
    else {
        self.filteredDataSource = self.dataSource;
    }
    [self.tableView reloadData];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.filteredDataSource count];
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
   
    CategoryTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"CategoryTableViewCell" forIndexPath:indexPath];
    [cell setModel:[self.filteredDataSource objectAtIndex:indexPath.row]];
    
    return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
        CategoryModel *selected = [self.filteredDataSource objectAtIndex:indexPath.row];
        self.selectedCategoryId = selected.queryTitle;
        [self performSegueWithIdentifier:@"onNotes" sender:self];
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath {
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    
    NotesTableViewController *dest = [segue destinationViewController];
    dest.categoryId = self.selectedCategoryId;
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}


@end
